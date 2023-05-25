import Block from "../../core/Block";

import Avatar from "../../components/Avatar";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Img from "../../components/Img";
import Form from "../../components/Form";

import template from "./profilePassword.hbs";

import "./profilePassword.scss";

import imgBackArrow from "../../assets/img/back-arrow.png";

import { focusout, focusin, submit } from "../../core/validation";

export class ProfilePassword extends Block {
  constructor() {
    super();
  }

  init() {
    this.children.avatar = new Avatar({
      name: "Илья",
    });

    this.children.form = new Form({
      formClass: "form-info",
      inputs: [
        new Input({
          classDiv: "form-info__block",
          label: "Старый пароль",
          name: "password",
          type: "password",
          classLabel: "form-info__block-title",
          classError: "error-input_bt",
          classInput:
            "form-info__block-desc profile-password__placeholder form-info__block_fz18",
          placeholder: "••••••••••••",
          events: {
            focusin,
            focusout,
          },
        }),

        new Input({
          classDiv: "form-info__block",
          label: "Новый пароль",
          name: "newPassword",
          type: "password",
          classLabel: "form-info__block-title",
          classError: "error-input_bt",
          classInput:
            "form-info__block-desc profile-password__placeholder form-info__block_fz18",
          placeholder: "••••••••••••",
          events: {
            focusin,
            focusout,
          },
        }),

        new Input({
          classDiv: "form-info__block",
          label: "Повторите пароль",
          name: "repeatNewPassword",
          type: "password",
          classLabel: "form-info__block-title",
          classError: "error-input_bt",
          classInput:
            "form-info__block-desc profile-password__placeholder form-info__block_fz18",
          placeholder: "••••••••••••",
          events: {
            focusin,
            focusout,
          },
        }),
      ],
      buttonClass: "",
      button: new Button({
        label: "Сохранить",
        class: "button form-info__btn-save form-info__btn-save_mt160",
        events: { click: submit },
      }),
      events: { submit },
    });

    this.children.imgBackArrow = new Img({
      srcImg: imgBackArrow,
      class: "profile__panel-circle",
      alt: "back-arrow",
      width: "35",
      height: "35",
    });
  }
  render() {
    return this.compile(template, {});
  }
}
