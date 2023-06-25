import Block from "../../core/Block";

import Link from "../../components/Link";

import template from "./page500.hbs";

import "./page500.scss";

class Page500 extends Block {
  constructor() {
    super();
  }

  init() {
    this.children.link = new Link({
      class: "link not-found__wrapper-link",
      href: "/messenger",
      label: "Назад к чатам",
    });
  }

  render() {
    return this.compile(template, {});
  }
}

export default Page500;
