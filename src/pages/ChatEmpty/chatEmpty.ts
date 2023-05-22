import Block from "../../core/Block";

import Message from "../../components/Message";

import template from "./chatEmpty.hbs";

import "./chatEmpty.scss";

export class ChatEmpty extends Block {
  constructor() {
    super();
  }

  init() {
    this.children.message_1 = new Message({
      name: "Андрей",
      text: "Изображение",
      time: "10:49",
      spanText: "",
      notificaton: "2",
    });

    this.children.message_2 = new Message({
      name: "Киноклуб",
      text: "стикер",
      time: "12:00",
      spanText: "Вы: ",
      classNotificatonDisplayNone: "notification-dn",
      notificaton: "",
    });

    this.children.message_3 = new Message({
      name: "Илья",
      text: "Друзья, у меня для вас особенный выпуск новостей!...",
      time: "10:49",
      spanText: "",
      notificaton: "2",
    });

    this.children.message_4 = new Message({
      name: "Андрей",
      text: "Изображение",
      time: "Пт",
      spanText: "",
      classNotificatonDisplayNone: "notification-dn",
      classChoose: "",
      notificaton: "",
    });
  }

  render() {
    return this.compile(template, {});
  }
}
