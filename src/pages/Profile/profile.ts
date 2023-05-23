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
      classDiv: "form-registration__wrapper form-registration__title",
      label: "Почта",
      name: "email",
      type: "email",
      classInput: "input form-profile__input error-registration__input ",
      value: "pochta@yandex.ru",
    });

    this.children.inputLogin = new Input({
      classDiv: "form-registration__wrapper form-registration__title ",
      label: "Логин",
      name: "login",
      type: "text",
      classInput: "input form-profile__input error-registration__input",
      value: "ivanivanov",
    });

    this.children.inputFirstName = new Input({
      classDiv: "form-registration__wrapper form-registration__title ",
      label: "Имя",
      name: "first_name",
      type: "text",
      classInput: "input form-profile__input error-registration__input ",
      value: "Илья",
    });

    this.children.inputSecondName = new Input({
      classDiv: "form-registration__wrapper form-registration__title ",
      label: "Фамилия",
      name: "second_name",
      type: "text",
      classInput: "input form-profile__input error-registration__input ",
      value: "Иванов",
    });

    this.children.inputChatName = new Input({
      classDiv: "form-registration__wrapper form-registration__title ",
      label: "Имя в чате",
      name: "chat_name",
      type: "text",
      classInput: "input form-profile__input error-password__input ",
      value: "Илья",
    });

    this.children.inputTelephone = new Input({
      classDiv: "form-registration__wrapper form-registration__title ",
      label: "Телефон",
      name: "phone",
      type: "text",
      classInput: "input form-profile__input error-registration__input",
      value: "8-(999)-999-999",
    });

    // this.children.inputPassword = new Input({
    //   classDiv: "form-registration__wrapper form-registration__title",
    //   label: "Пароль",
    //   name: "password",
    //   type: "password",
    //   classInput: "input form-registration__input error-password__input",
    // });

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
