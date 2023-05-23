import Block from "../../core/Block";

import Avatar from "../../components/Avatar";
import InfoBlock from "../../components/InfoBlock";
import Button from "../../components/Button";
import Input from "../../components/Input";

import template from "./profileData.hbs";

import { focusin, focusout } from "../../core/validation";

import "./profileData.scss";

export class ProfileData extends Block {
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
      classInput: "input form-registration__input error-registration__input",
      value: "pochta@yandex.ru",
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
      value: "ivanivanov",
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
      value: "Илья",
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
      value: "Иванов",
      events: {
        focusin,
        focusout,
      },
    });

    this.children.inputChatName = new Input({
      classDiv: "form-registration__wrapper form-registration__title",
      label: "Имя в чате",
      name: "chat_name",
      type: "text",
      classInput: "input form-registration__input error-password__input",
      value: "Илья",
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
      value: "89859521400",
      events: {
        focusin,
        focusout,
      },
    });

    // this.children.infoBlock_1 = new InfoBlock({
    //   label: "Почта",
    //   name: "email",
    //   type: "email",
    //   class: "form-info__block-desc profile profile__placeholder",
    //   value: "pochta@yandex.ru",
    // });

    // this.children.infoBlock_2 = new InfoBlock({
    //   label: "Логин",
    //   name: "login",
    //   type: "text",
    //   class: "form-info__block-desc profile profile__placeholder",
    //   value: "ivanivanov",
    // });

    // this.children.infoBlock_3 = new InfoBlock({
    //   label: "Имя",
    //   name: "first_name",
    //   type: "text",
    //   class: "form-info__block-desc profile profile__placeholder",
    //   value: "Илья",
    // });

    // this.children.infoBlock_4 = new InfoBlock({
    //   label: "Фамилия",
    //   name: "second_name",
    //   type: "text",
    //   class: "form-info__block-desc profile profile__placeholder",
    //   value: "Иванов",
    // });

    // this.children.infoBlock_5 = new InfoBlock({
    //   label: "Имя в чате",
    //   name: "display_name",
    //   type: "text",
    //   class: "form-info__block-desc profile profile__placeholder",
    //   value: "Илья",
    // });

    // this.children.infoBlock_6 = new InfoBlock({
    //   label: "Телефон",
    //   name: "phone",
    //   type: "text",
    //   class: "form-info__block-desc profile profile__placeholder",
    //   value: "+7 (909) 967 30 30",
    // });

    this.children.buttonSave = new Button({
      label: "Сохранить",
      class: "button form-info__btn-save",
    });
  }
  render() {
    return this.compile(template, {});
  }
}
