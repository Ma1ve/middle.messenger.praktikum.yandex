import Block from "../../core/Block";
import template from "./template.hbs";

export default class Button extends Block {
  constructor(props) {
    super("button", props);
  }

  render() {
    return template;
  }
}
