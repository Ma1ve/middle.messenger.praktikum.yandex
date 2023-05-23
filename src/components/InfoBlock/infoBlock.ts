import Block from "../../core/Block";

import Input from "../Input";

import template from "./infoBlock.hbs";

import "./infoBlock.scss";

interface InfoBlockProps {
  label: string;
  name: string;
  type: string;
  class: string;
  value?: string;
  placeholder?: string;
  events?: Record<string, (e: InputEvent) => void>;
}

export class InfoBlock extends Block {
  constructor(props: InfoBlockProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
