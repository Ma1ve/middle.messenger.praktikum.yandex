import Block from "../../core/Block";
import template from "./login.hbs";

import Button from "../../components/Button";
import Input from "../../components/Input";
import Link from "../../components/Link";

import { focusin, focusout, submit } from "../../core/validation";

import "./login.scss";

export class Login extends Block {
  constructor() {
    super();
  }

  init() {
    this.children.inputLogin = new Input({
      classDiv: "form-login__wrapper",
      label: "Логин",
      name: "login",
      type: "text",
      classLabel: "form-registration__title",
      classInput: "input form-login__input error-login__input",
      placeholder: "iamevvva",
      events: {
        focusin,
        focusout,
      },
    });

    this.children.inputPassword = new Input({
      classDiv: "form-login__wrapper",
      label: "Пароль",
      name: "password",
      type: "password",
      classLabel: "form-registration__title",
      classInput: "input form-login__input error-password__input",
      placeholder: "•••••••••••",
      events: {
        focusin,
        focusout,
      },
    });

    // this.children.linkEntry = new Link({
    //   href: "/chat",
    //   class: "link__chat",
    //   label: "Вход",
    // });

    this.children.buttonLogin = new Button({
      class: "button form-login__btn",
      type: "submit",
      label: "Войти",
      events: { click: submit },
    });

    this.children.linkRegistration = new Link({
      href: "/registration",
      class: "link form-login__link",
      label: "Нет аккаунта?",
    });
  }

  render() {
    return this.compile(template, {});
  }
}
