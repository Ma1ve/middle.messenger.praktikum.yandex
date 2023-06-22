import Block from "../../core/Block";
import template from "./input.hbs";

import "./input.scss";

interface InputProps {
  classDiv: string;
  label?: string;
  name: string;
  type: string;
  classLabel: string;
  classInput: string;
  classError?: string;
  placeholder?: string;
  readonly?: boolean;
  value?: string;
  events?: Record<string, (e: InputEvent) => void>;
}

export class Input extends Block {
  constructor(props: InputProps) {
    super(props);
  }

  render() {
    return this.compile(template, {
      ...this.props,
    });
  }
}
