import Block from "../../core/Block";

import Avatar from "../../components/Avatar";
import Link from "../../components/Link";
import Input from "../../components/Input";
import Img from "../../components/Img";

import template from "./profile.hbs";

import imgBackArrow from "../../assets/img/back-arrow.png";

import "./profile.scss";
import Form from "../../components/Form";

export class Profile extends Block {
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
          readonly: true,
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
          readonly: true,
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
          readonly: true,
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
          readonly: true,
        }),

        new Input({
          classDiv: "form-info__block",
          label: "Имя в чате",
          name: "chat_name",
          type: "text",
          classLabel: "form-info__block-title",
          classError: "error-input_bt",
          classInput: "form-info__block-desc profile-password__placeholder",
          value: "Илья",
          readonly: true,
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
          readonly: true,
        }),
      ],
    });

    // this.children.inputEmail = new Input({
    //   classDiv: "form-info__block",
    //   label: "Почта",
    //   name: "email",
    //   type: "email",
    //   classLabel: "form-info__block-title",
    //   classError: "error-input_bt",
    //   classInput: "form-info__block-desc profile-password__placeholder",
    //   value: "pochta@yandex.ru",
    //   readonly: true,
    // });

    // this.children.inputLogin = new Input({
    //   classDiv: "form-info__block",
    //   label: "Логин",
    //   name: "login",
    //   type: "text",
    //   classLabel: "form-info__block-title",
    //   classError: "error-input_bt",
    //   classInput: "form-info__block-desc profile-password__placeholder",
    //   value: "ivanivanov",
    //   readonly: true,
    // });

    // this.children.inputFirstName = new Input({
    //   classDiv: "form-info__block",
    //   label: "Имя",
    //   name: "first_name",
    //   type: "text",
    //   classLabel: "form-info__block-title",
    //   classError: "error-input_bt",
    //   classInput: "form-info__block-desc profile-password__placeholder",
    //   value: "Илья",
    //   readonly: true,
    // });

    // this.children.inputSecondName = new Input({
    //   classDiv: "form-info__block",
    //   label: "Фамилия",
    //   name: "second_name",
    //   type: "text",
    //   classLabel: "form-info__block-title",
    //   classError: "error-input_bt",
    //   classInput: "form-info__block-desc profile-password__placeholder",
    //   value: "Иванов",
    //   readonly: true,
    // });

    // this.children.inputChatName = new Input({
    //   classDiv: "form-info__block",
    //   label: "Имя в чате",
    //   name: "chat_name",
    //   type: "text",
    //   classLabel: "form-info__block-title",
    //   classError: "error-input_bt",
    //   classInput: "form-info__block-desc profile-password__placeholder",
    //   value: "Илья",
    //   readonly: true,
    // });

    // this.children.inputTelephone = new Input({
    //   classDiv: "form-info__block",
    //   label: "Телефон",
    //   name: "phone",
    //   type: "text",
    //   classLabel: "form-info__block-title",
    //   classError: "error-input_bt",
    //   classInput: "form-info__block-desc profile-password__placeholder",
    //   value: "89859521400",
    //   readonly: true,
    // });

    this.children.linkChangeData = new Link({
      href: "/profile/data",
      class: "link profile__info-block-title",
      label: "Изменить данные",
    });

    this.children.linkChangePassword = new Link({
      href: "/profile/password",
      class: "link profile__info-block-title",
      label: "Изменить пароль",
    });

    this.children.linkExit = new Link({
      href: "/login",
      class: "link profile__info-block-title_red",
      label: "Выйти",
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
    return this.compile(template, { ...this.props });
  }
}
