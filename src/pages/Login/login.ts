import Block from "../../core/Block";
import template from "./login.hbs";

import Button from "../../components/Button";
import Input from "../../components/Input";
import Link from "../../components/Link";

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
      classInput: "input form-login__input error-login__input",
      placeholder: "iamevvva",
      errorText: "",
    });

    this.children.inputPassword = new Input({
      classDiv: "form-login__wrapper",
      label: "Пароль",
      name: "password",
      type: "password",
      classInput: "input form-login__input error-password__input",
      placeholder: "•••••••••••",
      errorText: "",
    });

    this.children.linkEntry = new Link({
      href: "/chat",
      class: "link__chat",
      label: "Вход",
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
