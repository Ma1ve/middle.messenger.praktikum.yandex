import Block from "../../core/Block";

import Avatar from "../../components/Avatar";
import Link from "../../components/Link";
import InfoBlock from "../../components/InfoBlock";

import template from "./profile.hbs";

import "./profile.scss";

export class Profile extends Block {
  constructor() {
    super();
  }

  init() {
    this.children.avatar = new Avatar({
      name: "Илья",
    });

    this.children.infoBlock_1 = new InfoBlock({
      label: "Почта",
      name: "email",
      type: "email",
      class: "form-info__block-desc profile profile__placeholder",
      value: "pochta@yandex.ru",
    });

    this.children.infoBlock_2 = new InfoBlock({
      label: "Логин",
      name: "login",
      type: "text",
      class: "form-info__block-desc profile profile__placeholder",
      value: "ivanivanov",
    });

    this.children.infoBlock_3 = new InfoBlock({
      label: "Имя",
      name: "first_name",
      type: "text",
      class: "form-info__block-desc profile profile__placeholder",
      value: "Илья",
    });

    this.children.infoBlock_4 = new InfoBlock({
      label: "Фамилия",
      name: "second_name",
      type: "text",
      class: "form-info__block-desc profile profile__placeholder",
      value: "Иванов",
    });

    this.children.infoBlock_5 = new InfoBlock({
      label: "Имя в чате",
      name: "display_name",
      type: "text",
      class: "form-info__block-desc profile profile__placeholder",
      value: "Илья",
    });

    this.children.infoBlock_6 = new InfoBlock({
      label: "Телефон",
      name: "phone",
      type: "text",
      class: "form-info__block-desc profile profile__placeholder",
      value: "+7 (909) 967 30 30",
    });

    this.children.linkChangeData = new Link({
      href: "/profile/data",
      class: "link profile__info-block-title",
      label: "Изменить данные",
    });

    this.children.linkChangePassword = new Link({
      href: "/profile/password",
      class: "link profile__info-block-title",
      label: "Изменить пароль",
    });

    this.children.linkExit = new Link({
      href: "/login",
      class: "link profile__info-block-title_red",
      label: "Выйти",
    });
  }
  render() {
    return this.compile(template, {});
  }
}
