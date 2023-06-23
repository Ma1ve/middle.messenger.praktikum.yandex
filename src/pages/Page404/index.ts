import Block from "../../core/Block";
import template from "./page404.hbs";

import Link from "../../components/Link";

import "./page404.scss";

class Page404 extends Block {
  constructor() {
    super();
  }

  init() {
    this.children.link = new Link({
      href: "/messenger",
      class: "link not-found__wrapper-link",
      label: "Назад к чатам",
    });
  }

  render() {
    return this.compile(template, {});
  }
}

export default Page404;
