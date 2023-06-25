import Block from "../../core/Block";

import template from "./userMessage.hbs";

import "./userMessage.scss";

interface UserMessageProps {
  userMessage: string,
  userTime: string,
  isOwnUserMessage: string;

}


class UserMessage extends Block {
  constructor(props: UserMessageProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default UserMessage;
