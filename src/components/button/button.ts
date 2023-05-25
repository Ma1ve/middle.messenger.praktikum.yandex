import Block from "../../core/Block";
import template from "./button.hbs";

import "./button.scss";

interface ButtonProps {
  label: string;
  class: string;
  type?: string;
  events?: Record<string, (e: InputEvent) => void>;
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
