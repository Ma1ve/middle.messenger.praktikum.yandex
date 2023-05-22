import Block from "../../core/Block";

import Avatar from "../../components/Avatar";
import InfoBlock from "../../components/InfoBlock";
import Button from "../../components/Button";

import template from "./profilePassword.hbs";

import "./profilePassword.scss";

export class ProfilePassword extends Block {
  constructor() {
    super();
  }

  init() {
    this.children.avatar = new Avatar({
      name: "Илья",
    });

    this.children.infoBlock_1 = new InfoBlock({
      label: "Старый пароль",
      name: "oldPassword",
      type: "text",
      class: "form-info__block-desc profile-password__placeholder",
      placeholder: "••••••••••••",
    });

    this.children.infoBlock_2 = new InfoBlock({
      label: "Новый пароль",
      name: "newPassword",
      type: "text",
      class: "form-info__block-desc profile-password__placeholder",
      placeholder: "••••••••••••",
    });

    this.children.infoBlock_3 = new InfoBlock({
      label: "Повторите новый пароль",
      name: "newPassword",
      type: "text",
      class: "form-info__block-desc profile-password__placeholder",
      placeholder: "••••••••••••",
    });

    this.children.buttonSave = new Button({
      label: "Сохранить",
      class: "button form-info__btn-save form-info__btn-save_mt160",
    });
  }
  render() {
    return this.compile(template, {});
  }
}
