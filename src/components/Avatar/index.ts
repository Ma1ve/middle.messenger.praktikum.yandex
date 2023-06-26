import Block from "../../core/Block";
import template from "./avatar.hbs";

import "./avatar.scss";

import Union from "../../assets/img/union.svg";

interface AvatarProps {
  name: string;
  img?: string;
  events?: Record<string, (event: MouseEvent) => void>
}

class Avatar extends Block {
  constructor(props: AvatarProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props, img: window.store.getState().user!.avatar ? this.props.img: Union });
  }
}

export default Avatar;

