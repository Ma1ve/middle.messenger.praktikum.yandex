import Block from "../../core/Block";

import Avatar from "../../components/Avatar";
import Link from "../../components/Link";
import InfoBlock from "../../components/InfoBlock";
import Input from "../../components/Input";

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

    this.children.inputEmail = new Input({
      classDiv: "form-info__block",
      label: "Почта",
      name: "email",
      type: "email",
      classLabel: "form-info__block-title",
      classError: "error-input_bt",
      classInput: "form-info__block-desc profile-password__placeholder",
      value: "pochta@yandex.ru",
      readonly: true,
    });

    this.children.inputLogin = new Input({
      classDiv: "form-info__block",
      label: "Логин",
      name: "login",
      type: "text",
      classLabel: "form-info__block-title",
      classError: "error-input_bt",
      classInput: "form-info__block-desc profile-password__placeholder",
      value: "ivanivanov",
      readonly: true,
    });

    this.children.inputFirstName = new Input({
      classDiv: "form-info__block",
      label: "Имя",
      name: "first_name",
      type: "text",
      classLabel: "form-info__block-title",
      classError: "error-input_bt",
      classInput: "form-info__block-desc profile-password__placeholder",
      value: "Илья",
      readonly: true,
    });

    this.children.inputSecondName = new Input({
      classDiv: "form-info__block",
      label: "Фамилия",
      name: "second_name",
      type: "text",
      classLabel: "form-info__block-title",
      classError: "error-input_bt",
      classInput: "form-info__block-desc profile-password__placeholder",
      value: "Иванов",
      readonly: true,
    });

    this.children.inputChatName = new Input({
      classDiv: "form-info__block",
      label: "Имя в чате",
      name: "chat_name",
      type: "text",
      classLabel: "form-info__block-title",
      classError: "error-input_bt",
      classInput: "form-info__block-desc profile-password__placeholder",
      value: "Илья",
      readonly: true,
    });

    this.children.inputTelephone = new Input({
      classDiv: "form-info__block",
      label: "Телефон",
      name: "phone",
      type: "text",
      classLabel: "form-info__block-title",
      classError: "error-input_bt",
      classInput: "form-info__block-desc profile-password__placeholder",
      value: "89859521400",
      readonly: true,
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
