import Block from "../../core/Block";

import template from "./form.hbs";

import "./form.scss";

interface FormProps {
  class: string;
  formInputs?: Block[];
  formButton: Block;
  evets: {
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
