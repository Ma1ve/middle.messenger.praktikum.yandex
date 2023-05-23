import Block from "../../core/Block";

import Input from "../../components/Input";
import Button from "../../components/Button";
import Link from "../../components/Link";
import Form from "../../components/Form";

import template from "./registration.hbs";

import { focusin, focusout, submit } from "../../core/validation";

export class Registration extends Block {
  constructor() {
    super();
  }

  init() {
    // this.children.form = new Form({
    //   class: "form-registration",
    //   formInputs: [
    //     new Input({
    //       classDiv: "form-registration__wrapper form-registration__title",
    //       label: "Почта",
    //       name: "email",
    //       type: "email",
    //       classInput:
    //         "input form-registration__input error-registration__input",
    //       placeholder: "pochta@yandex.ru",
    //       events: {
    //         focusin,
    //         focusout,
    //       },
    //     }),

    //     new Input({
    //       classDiv: "form-registration__wrapper form-registration__title",
    //       label: "Логин",
    //       name: "login",
    //       type: "text",
    //       classInput:
    //         "input form-registration__input error-registration__input",
    //       placeholder: "pochta@yandex.ru",
    //       events: {
    //         focusin,
    //         focusout,
    //       },
    //     }),

    //     new Input({
    //       classDiv: "form-registration__wrapper form-registration__title",
    //       label: "Имя",
    //       name: "first_name",
    //       type: "text",
    //       classInput:
    //         "input form-registration__input error-registration__input",
    //       placeholder: "Ева",
    //       events: {
    //         focusin,
    //         focusout,
    //       },
    //     }),

    //     new Input({
    //       classDiv: "form-registration__wrapper form-registration__title",
    //       label: "Фамилия",
    //       name: "second_name",
    //       type: "text",
    //       classInput:
    //         "input form-registration__input error-registration__input",
    //       placeholder: "Варнакова",
    //       events: {
    //         focusin,
    //         focusout,
    //       },
    //     }),

    //     new Input({
    //       classDiv: "form-registration__wrapper form-registration__title",
    //       label: "Телефон",
    //       name: "phone",
    //       type: "text",
    //       classInput:
    //         "input form-registration__input error-registration__input",
    //       placeholder: "8-(999)-999-999",
    //       events: {
    //         focusin,
    //         focusout,
    //       },
    //     }),

    //     new Input({
    //       classDiv: "form-registration__wrapper form-registration__title",
    //       label: "Пароль",
    //       name: "password",
    //       type: "password",
    //       classInput: "input form-registration__input error-password__input",
    //       placeholder: "•••••••••••",
    //       events: {
    //         focusin,
    //         focusout,
    //       },
    //     }),
    //   ],

    //   formButton: new Button({
    //     class: "button form-registration__btn",
    //     type: "submit",
    //     label: "Зарегестрироваться",
    //     events: { click: submit },
    //   }),
    //   evets: { submit },
    // });

    this.children.inputEmail = new Input({
      classDiv: "form-registration__wrapper form-registration__title",
      label: "Почта",
      name: "email",
      type: "email",
      classInput: "input form-registration__input error-registration__input",
      placeholder: "pochta@yandex.ru",
      events: {
        focusin,
        focusout,
      },
    });

    this.children.inputLogin = new Input({
      classDiv: "form-registration__wrapper form-registration__title",
      label: "Логин",
      name: "login",
      type: "text",
      classInput: "input form-registration__input error-registration__input",
      placeholder: "iamevvva",
      events: {
        focusin,
        focusout,
      },
    });

    this.children.inputFirstName = new Input({
      classDiv: "form-registration__wrapper form-registration__title",
      label: "Имя",
      name: "first_name",
      type: "text",
      classInput: "input form-registration__input error-registration__input",
      placeholder: "Ева",
      events: {
        focusin,
        focusout,
      },
    });

    this.children.inputSecondName = new Input({
      classDiv: "form-registration__wrapper form-registration__title",
      label: "Фамилия",
      name: "second_name",
      type: "text",
      classInput: "input form-registration__input error-registration__input",
      placeholder: "Варнакова",
      events: {
        focusin,
        focusout,
      },
    });

    this.children.inputTelephone = new Input({
      classDiv: "form-registration__wrapper form-registration__title",
      label: "Телефон",
      name: "phone",
      type: "text",
      classInput: "input form-registration__input error-registration__input",
      placeholder: "8-(999)-999-999",
      events: {
        focusin,
        focusout,
      },
    });

    this.children.inputPassword = new Input({
      classDiv: "form-registration__wrapper form-registration__title",
      label: "Пароль",
      name: "password",
      type: "password",
      classInput: "input form-registration__input error-password__input",
      placeholder: "•••••••••••",
      events: {
        focusin,
        focusout,
      },
    });

    this.children.buttonRegistration = new Button({
      class: "button form-registration__btn",
      type: "submit",
      label: "Зарегестрироваться",
      events: { click: submit },
    });

    this.children.linkLogin = new Link({
      href: "/login",
      class: "link form-registration__link",
      label: "Войти",
    });
  }

  render() {
    return this.compile(template, {});
  }
}
