import EventBus from "./EventBus.ts";

class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_RENDER: "flow:render",
  };

  _element = null;
  _meta = null;

  constructor(tagName = "div", props = {}) {
    const eventBus = new EventBus();

    this._meta = {
      tagName,
      props,
    };

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResourses() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    this._createResourses();
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount(oldProps) {
    // this.dispatchComponentDidMount();
  }

  dispatchComponentDidMount() {
    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps, newProps) {}

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
    this.render();

    this._element.innerHTML = block;
  }

  render() {}

  getContent() {
    return this.element;
  }

  _makePropsProxy(props) {
    const self = this;

    return props;
  }

  _createDocumentElement(tagName) {
    return document.createElement(tagName);
  }

  show() {
    this.getContent().style.display = "block";
  }

  hide() {
    this.getContent().style.display = "none";
  }
}

export default Block;
