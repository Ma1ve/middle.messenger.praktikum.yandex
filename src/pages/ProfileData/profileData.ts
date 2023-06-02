import Block from "../../core/Block";

import Avatar from "../../components/Avatar";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Img from "../../components/Img";
import Form from "../../components/Form";

import template from "./profileData.hbs";

import imgBackArrow from "../../assets/img/back-arrow.png";

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

    this.children.form = new Form({
      formClass: "form-info",
      inputs: [
        new Input({
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
        }),
        new Input({
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
        }),

        new Input({
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
        }),

        new Input({
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
        }),

        new Input({
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
        }),
      ],
      buttonClass: "",
      button: new Button({
        label: "Сохранить",
        class: "button form-info__btn-save",
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
