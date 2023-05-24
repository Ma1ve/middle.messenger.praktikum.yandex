import Block from "../../core/Block";
import template from "./avatar.hbs";

import "./avatar.scss";

import Union from "../../assets/img/union.svg";

interface AvatarProps {
  name: string;
  img?: string;
}

export class Avatar extends Block {
  constructor(props: AvatarProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props, img: Union });
  }
}
