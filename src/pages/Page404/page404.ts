import Block from "../../core/Block";
import template from "./page404.hbs";

import Input from "../../components/Input";
import Link from "../../components/Link";

import "./page404.scss";

export class Page404 extends Block {
  constructor() {
    super();
  }

  init() {
    this.children.link = new Link({
      href: "/chat",
      class: "not-found__wrapper-link",
      label: "Назад к чатам",
    });
  }

  render() {
    return this.compile(template, {});
  }
}
