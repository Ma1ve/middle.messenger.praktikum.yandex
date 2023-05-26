import EventBus from "./EventBus";
import { v4 as makeUUID } from "uuid";

class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  } as const;

  public id: string | null = makeUUID();

  protected props: Record<string, unknown>;

  protected children: Record<string, Block | Block[]>;

  private eventBus: () => EventBus;

  private _element: HTMLElement | null = null;

  private readonly _meta: Record<string, unknown> | null = null;

  constructor(childrenAndProps: any = {}) {
    const eventBus = new EventBus();

    const { props, children } = this._getChildrenAndProps(childrenAndProps);

    this._meta = {
      props,
    };

    this.children = children;
    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  _getChildrenAndProps(childrenAndProps: any) {
    const props: Record<string, any> = {};
    const children: Record<string, Block | Block[]> = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (
        Array.isArray(value) &&
        value.every((v) => v instanceof Block)
      ) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { props, children };
  }

  private _registerEvents(eventBus: any) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources() {
    const tagName = "div";
    this._element = this._createDocumentElement(tagName);
  }

  private _init() {
    this._createResources();

    this.init();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init() {
    // empty
  }

  private _componentDidMount() {
    this.componentDidMount();
  }

  public componentDidMount() {
    // empty
  }

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);

    Object.values(this.children).forEach((child) => {
    if (child instanceof Block) {
      child.dispatchComponentDidMount();
    } else if (Array.isArray(child)) {
      child.forEach((c) => {
        if (c instanceof Block) {
          c.dispatchComponentDidMount();
        }
      });
    }

  });
  }

  private _componentDidUpdate(oldProps: any, newProps: any) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

  }

  protected componentDidUpdate(
    oldProps: any,
    newProps: any
  ): boolean {
    return true;
  }

  public setProps = (nextProps: Record<string, unknown>) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  public get element() {
    return this._element;
  }

  private _render() {
    const fragment = this.render();

    this._removeEvents();

    const newElement = fragment.firstElementChild as HTMLElement;
    this._element!.replaceWith(newElement);

    this._element = newElement;

    this._addEvents();
  }

  protected compile(template: (props: any) => string, props: any) {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([name, component]) => {
      if (Array.isArray(component)) {
        component.forEach((val) => {
          if (!propsAndStubs[name]) {
            propsAndStubs[name] = `<div data-id="${val.id}"></div>`;
          } else {
            propsAndStubs[
              name
            ] = `${propsAndStubs[name]}<div data-id="${val.id}"></div>`;
          }
        });
        return;
      }

      propsAndStubs[name] = `<div data-id="${component.id}"></div>`;
    });

    const html = template(propsAndStubs);

    const temp = document.createElement("template");

    temp.innerHTML = html;

    Object.entries(this.children).forEach(([_, component]) => {
      let stub;
      if (Array.isArray(component)) {
        component.forEach((val) => {
          stub = temp.content.querySelector(`[data-id='${val.id}']`);
          if (!stub) {
            return;
          }

          stub.replaceWith(val.getContent()!);
        });
      } else {
        stub = temp.content.querySelector(`[data-id='${component.id}']`);
        if (!stub) {
          return;
        }

        stub.replaceWith(component.getContent()!);
      }

    });

    return temp.content;
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  private _addEvents() {
    const { events = {} } = this.props as {
      events?: Record<string, () => void>;
    };

    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  private _removeEvents() {
    const { events } = this.props as {
      events?: Record<string, () => void>;
    };

    if (!events || !this._element) {
      return;
    }

    Object.keys(events).forEach((eventName) => {
      this._element!.addEventListener(eventName, events[eventName]);
    });
  }

  public getContent() {
    return this.element;
  }

  private _makePropsProxy(props: any) {

    const self = this;

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];

        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldTarget = { ...target };

        target[prop] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  private _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  public show() {
    this.getContent()!.style.display = "block";
  }

  public hide() {
    this.getContent()!.style.display = "none";
  }
}

export default Block;

