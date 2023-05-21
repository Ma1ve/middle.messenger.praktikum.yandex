import Block from "../../core/Block";
import template from "./input.hbs";

interface InputProps {
  classDiv: string;
  label: string;
  name: string;
  type: string;
  classInput: string;
  placeholder: string;
  errorText: null | string;
}

export class Input extends Block {
  constructor(props: InputProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
