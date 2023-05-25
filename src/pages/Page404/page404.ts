import Block from "../../core/Block";
import template from "./page404.hbs";

import Link from "../../components/link";

import "./page404.scss";

export class Page404 extends Block {
  constructor() {
    super();
  }

  init() {
    this.children.link = new Link({
      href: "/chat",
      class: "link not-found__wrapper-link",
      label: "Назад к чатам",
    });
  }

  render() {
    return this.compile(template, {});
  }
}
