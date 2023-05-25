import Block from "../../core/Block";

import template from "./form.hbs";

import "./form.scss";

interface FormProps {
  formClass?: string;
  inputs: Block[];
  buttonClass?: string;
  button?: Block;
  events?: {
    submit: (e: SubmitEvent) => void;
  };
}

export class Form extends Block {
  constructor(props: FormProps) {
    super(props);
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
