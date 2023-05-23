import Block from "../../core/Block";

import Avatar from "../../components/Avatar";
import InfoBlock from "../../components/InfoBlock";
import Button from "../../components/Button";
import Input from "../../components/Input";

import template from "./profileData.hbs";

import { focusin, focusout, submit } from "../../core/validation";

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
      classDiv: "form-info__block",
      label: "Почта",
      name: "email",
      type: "email",
      classLabel: "form-info__block-title",
      classError: "error-input_bt",
      classInput: "form-info__block-desc profile-password__placeholder",
      value: "pochta@yandex.ru",
      events: {
        focusin,
        focusout,
      },
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
      events: {
        focusin,
        focusout,
      },
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
      events: {
        focusin,
        focusout,
      },
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
      events: {
        focusin,
        focusout,
      },
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
      events: {
        focusin,
        focusout,
      },
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
      events: {
        focusin,
        focusout,
      },
    });

    this.children.buttonSave = new Button({
      label: "Сохранить",
      class: "button form-info__btn-save",
      events: { click: submit },
    });
  }
  render() {
    return this.compile(template, {});
  }
}
