import EventBus from "./eventBus.ts";

import { v4 as makeUUID } from "uuid";

class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow: component-did-update",
    FLOW_RENDER: "flow:render",
  };

  _element = null;
  _meta = null;
  _id = null;

  constructor(tagName = "div", props = {}) {
    const eventBus = new EventBus();

    this._meta = { tagName, props };

    this._id = makeUUID();

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResourses() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    this._createResourses();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();

    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  componentDidMount(oldProps) {
    // this.dispatchComponentDidMount();
  }

  // dispatchComponentDidMount() {
  //   this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  // }

  _componentDidUpdate(oldProps, newProps) {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (!response) {
      return;
    }

    this._render();
  }

  componentDidUpdate(oldProps, newProps) {
    return true;
  }

  setProps = (nextProps) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    const block = this.render();

    this._removeEvents();

    this._element.innerHTML = block;

    this._addEvents();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  render() {
    return "";
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props) {
    // const shouldAddId = props.settings.withInternalID === true;
    // const proxyProps = shouldAddId ? { ...props, __id: this._id } : props;

    const proxyProps = props;

    const checkPrivateProp = (prop) => prop.startsWith("_");

    return new Proxy(proxyProps, {
      get(target, prop) {
        if (checkPrivateProp(prop)) {
          throw new Error("Нет прав");
        } else {
          const value = target[prop];
          return typeof value === "function" ? value.bind(target) : value;
        }
      },
      set(target, prop, val) {
        if (checkPrivateProp(prop)) {
          throw new Error("Нет прав");
        } else {
          target[prop] = val;
          this.eventBus().emit(Block.EVENTS.FLOW_CDU);
          return true;
        }
      },
      deleteProperty(target, prop) {
        if (checkPrivateProp(prop)) {
          throw new Error("Нет прав");
        } else {
          delete target[prop];
          return true;
        }
      },
    });
  }
  // if (target[prop] === 'withInternalID') {
  //           target[prop][1]
  //         }
  _createDocumentElement(tagName) {
    const element = document.createElement(tagName);
    element.setAttribute("data-id", this._id);
    return element;
  }

  _removeEvents() {
    const { evets } = this.props;

    if (!evets || !this._element) {
      return;
    }

    Object.keys(event).forEach((eventName) => {
      this._element.removeEventListener(eventName, evets[eventName]);
    });
  }

  _addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element.addEventListener(eventName, events[eventName]);
    });
  }

  show() {
    this.getContent().style.display = "block";
  }

  hide() {
    this.getContent().style.display = "none";
  }
}

export default Block;
