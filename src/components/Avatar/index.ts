import Block from "../../core/Block";
import template from "./avatar.hbs";

import "./avatar.scss";

import Union from "../../assets/img/union.svg";

interface AvatarProps {
  name?: string;
  img?: string;
  objectFit?: string;
  events?: Record<string, (event: MouseEvent) => void>
}

class Avatar extends Block {
  constructor(props: AvatarProps) {
    super(props);
  }

  render() {
    const hasImage = window.store.getState().user!.avatar && this.props.img;
    const imgSrc = hasImage ? this.props.img : Union;

    return this.compile(template, { ...this.props, img: imgSrc, objectFit: hasImage ? "object-fit-cover" : "object-fit-none" });

    // return this.compile(template, { ...this.props, img: window.store.getState().user!.avatar ? this.props.img: Union });
  }
}

export default Avatar;

