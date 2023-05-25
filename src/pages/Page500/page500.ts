import Block from "../../core/Block";
import Link from "../../components/Link";
import template from "./page500.hbs";

import "./page500.scss";

export class Page500 extends Block {
  constructor() {
    super();
  }

  init() {
    this.children.link = new Link({
      class: "link not-found__wrapper-link",
      href: "/chat",
      label: "Назад к чатам",
    });
  }

  render() {
    return this.compile(template, {});
  }
}
