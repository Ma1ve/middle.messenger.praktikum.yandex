import Block from "../../core/Block";


import Img from "../Img/img";

import template from "./menuTabs.hbs";

import "./menuTabs.scss";

interface MenuTabsProps {
  imgClip: Img;
  textClip: string;
  events?: Record<string, (e: MouseEvent) => void>;
}

export class MenuTabs extends Block {
  constructor(props: MenuTabsProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
