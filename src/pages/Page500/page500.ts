import Block from "../../core/Block";
<<<<<<< HEAD

import Link from "../../components/Link";

=======
import Link from "../../components/Link";
>>>>>>> efd1d73f65993d11c6079a4c8ca0625ac3c1e884
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
