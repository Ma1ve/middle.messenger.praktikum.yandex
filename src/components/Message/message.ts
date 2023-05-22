import Block from "../../core/Block";

import template from "./message.hbs";

import "./message.scss";

interface MessageProps {
  name: string;
  text: string;
  time: string;
  spanText: string;
  notificaton: string;
  classNotificatonDisplayNone?: string;
  classChoose?: string;
}

export class Message extends Block {
  constructor(props: MessageProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
