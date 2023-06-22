import Block from "../../core/Block";

import template from "./chatTab.hbs";

import "./chatTab.scss";

interface ChatTabProps {
  name: string;
  text?: string;
  time?: string;
  spanText: string;
  notificaton: string;
  classNotificatonDisplayNone?: string;
  classChoose?: string;
  events: Record<string, (e: Event) => void>
}

export class ChatTab extends Block {
  constructor(props: ChatTabProps) {
    super(props);
  }

   get chatTabProps(): ChatTabProps {
    return this.props as ChatTabProps;
  }


  render() {
    return this.compile(template, { ...this.props });
  }
}
