import Block from "../../core/Block";
import template from "./avatar.hbs";

import "./avatar.scss";

interface AvatarProps {
  name: string;
}

export class Avatar extends Block {
  constructor(props: AvatarProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
