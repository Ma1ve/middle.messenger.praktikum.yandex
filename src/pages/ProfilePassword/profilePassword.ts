import Block from "../../core/Block";

import Avatar from "../../components/Avatar";
import InfoBlock from "../../components/InfoBlock";
import Button from "../../components/Button";
import Input from "../../components/Input";

import template from "./profilePassword.hbs";

import "./profilePassword.scss";

import { focusout, focusin, submit } from "../../core/validation";

export class ProfilePassword extends Block {
  constructor() {
    super();
  }

  init() {
    this.children.avatar = new Avatar({
      name: "Илья",
    });

    this.children.inputOldPassword = new Input({
      classDiv: "form-info__block",
      label: "Старый пароль",
      name: "password",
      type: "text",
      classLabel: "form-info__block-title",
      classError: "error-input_bt",
      classInput: "form-info__block-desc profile-password__placeholder",
      placeholder: "••••••••••••",
      events: {
        focusin,
        focusout,
      },
    });

    this.children.inputNewPassword = new Input({
      classDiv: "form-info__block",
      label: "Новый пароль",
      name: "password",
      type: "text",
      classLabel: "form-info__block-title",
      classError: "error-input_bt",
      classInput: "form-info__block-desc profile-password__placeholder",
      placeholder: "••••••••••••",
      events: {
        focusin,
        focusout,
      },
    });

    this.children.inputNewPasswordRetry = new Input({
      classDiv: "form-info__block",
      label: "Повторите пароль",
      name: "password",
      type: "text",
      classLabel: "form-info__block-title",
      classError: "error-input_bt",
      classInput: "form-info__block-desc profile-password__placeholder",
      placeholder: "••••••••••••",
      events: {
        focusin,
        focusout,
      },
    });

    this.children.buttonSave = new Button({
      label: "Сохранить",
      class: "button form-info__btn-save form-info__btn-save_mt160",
      events: { click: submit },
    });
  }
  render() {
    return this.compile(template, {});
  }
}
