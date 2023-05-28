import Block from "../../core/Block";
import template from "./link.hbs";

import "./link.scss";

interface LinkProps {
  href: string;
  class: string;
  label: string;
}

export class Link extends Block {
  constructor(props: LinkProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
