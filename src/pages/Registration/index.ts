import Block from "../../core/Block";

import Input from "../../components/Input";
import Button from "../../components/Button";
import Link from "../../components/Link";

import template from "./registration.hbs";

import { focusin, focusout, submit } from "../../core/validation";
import { withStore } from "../../utils/withStore";
import { withRouter } from "../../utils/withRouter";
import { Loading } from "../../components/Loading/loading";

interface RegistrationProps {}
class Registration extends Block {
  constructor(props: RegistrationProps) {
    super(props);
  }

  init() {

    this.children.Loading = new Loading({})

    this.children.inputEmail = new Input({
      classDiv: "form-registration__wrapper form-registration__title",
      label: "Почта",
      name: "email",
      type: "email",
      classLabel: "form-registration__title",
      classInput:
        "input form-registration__input error-registration__input",
      placeholder: "pochta@yandex.ru",
      events: {
        focusin,
        focusout,
      },
    }),

    this.children.inputLogin = new Input({
      classDiv: "form-registration__wrapper form-registration__title",
      label: "Логин",
      name: "login",
      type: "text",
      classLabel: "form-registration__title",
      classInput:
        "input form-registration__input error-registration__input",
      placeholder: "iamevvva",
      events: {
        focusin,
        focusout,
      },
    }),

      this.children.inputName = new Input({
        classDiv: "form-registration__wrapper form-registration__title",
        label: "Имя",
        name: "first_name",
        type: "text",
        classLabel: "form-registration__title",
        classInput:
          "input form-registration__input error-registration__input",
        placeholder: "Ева",
        events: {
          focusin,
          focusout,
        },
      }),

     this.children.inputSurname = new Input({
      classDiv: "form-registration__wrapper form-registration__title",
      label: "Фамилия",
      name: "second_name",
      type: "text",
      classLabel: "form-registration__title",
      classInput:
        "input form-registration__input error-registration__input",
      placeholder: "Варнакова",
      events: {
        focusin,
        focusout,
      },
    }),

    this.children.inputPhone = new Input({
      classDiv: "form-registration__wrapper form-registration__title",
      label: "Телефон",
      name: "phone",
      type: "text",
      classLabel: "form-registration__title",
      classInput:
        "input form-registration__input error-registration__input",
      placeholder: "8-(999)-999-999",
      events: {
        focusin,
        focusout,
      },
    }),

    this.children.inputPassword = new Input({
      classDiv: "form-registration__wrapper form-registration__title",
      label: "Пароль",
      name: "password",
      type: "password",
      classLabel: "form-registration__title",
      classInput: "input form-registration__input error-password__input",
      placeholder: "•••••••••••",
      events: {
        focusin,
        focusout,
      },
    }),

    this.children.buttonRegistration = new Button({
      class: "button form-registration__btn",
      type: "submit",
      label: "Зарегестрироваться",
      events: { click: submit },
    }),

    this.children.linkLogin = new Link({
      href: "",
      class: "link form-registration__link",
      label: "Войти",
      events: {
        click: (event) => {
          event.preventDefault();
          this.props.router.go('/')
        }
      }
    });
  }

  render() {
    return this.compile(template, {...this.props});
  }
}

export default withRouter(withStore(Registration))
