import Block from "../../core/Block";

import template from "./img.hbs";

import "./img.scss";

interface ImgProps {
  srcImg: string;
  class?: string;
  alt?: string;
  width?: string;
  height?: string;
}

export class Img extends Block {
  constructor(props: ImgProps) {
    super(props);
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
