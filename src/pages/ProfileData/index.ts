import Block from "../../core/Block";

import UserController from "../../services/UserController";

import Avatar from "../../components/Avatar";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Img from "../../components/Img";
import Modal from "../../components/Modal";


import template from "./profileData.hbs";

import imgBackArrow from "../../assets/img/back-arrow.png";

import { focusin, focusout, submit } from "../../core/validation";

import { withRouter } from "../../utils/withRouter";
import { withStore } from "../../utils/withStore";
import { BASE_URL } from "../../core/htttpTransport";

import "./profileData.scss";



interface ProfileDataProps {}
class ProfileData extends Block {
  constructor(props: ProfileDataProps) {
    super(props);
  }

  init() {

    this.children.avatar = new Avatar({
      name: "Илья",
      img: `${BASE_URL}/resources${this.props.store.state.user.avatar}`,
      events: {
         click: () => {
           this.children.modal.show();
        }
      }
    });


    this.children.modal = new Modal({
        modalTitle: 'Загрузите файл',
        isModalChat: false,
        btn:  new Button({
            class: 'block-modal__btn',
            label: 'Поменять',
            events: {
              click: () => {
                const fileInput = document.querySelector<HTMLInputElement>(".block-modal__file");

                const selectedFile = fileInput!.files![0];

                const form = new FormData();
                form.append("avatar", selectedFile);

                window.store.dispatch(UserController.updateAvatar, form)
              }
            }
          })
      });

    this.children.inputEmail = new Input({
      classDiv: "form-info__block",
      label: "Почта",
      name: "email",
      type: "email",
      classLabel: "form-info__block-title",
      classError: "error-input_bt",
      classInput: "form-info__block-desc profile-password__placeholder",
      value: `${this.props.store.state.user.email}`,
      events: {
        focusin,
        focusout,
      },
    }),

    this.children.inputLogin = new Input({
      classDiv: "form-info__block",
      label: "Логин",
      name: "login",
      type: "text",
      classLabel: "form-info__block-title",
      classError: "error-input_bt",
      classInput: "form-info__block-desc profile-password__placeholder",
      value: `${this.props.store.state.user.login}`,
      events: {
        focusin,
        focusout,
      },
    }),


    this.children.inputFirstName = new Input({
      classDiv: "form-info__block",
      label: "Имя",
      name: "first_name",
      type: "text",
      classLabel: "form-info__block-title",
      classError: "error-input_bt",
      classInput: "form-info__block-desc profile-password__placeholder",
      value: `${this.props.store.state.user.first_name}`,
      events: {
        focusin,
        focusout,
      },
    }),

    this.children.inputSurname = new Input({
      classDiv: "form-info__block",
      label: "Фамилия",
      name: "second_name",
      type: "text",
      classLabel: "form-info__block-title",
      classError: "error-input_bt",
      classInput: "form-info__block-desc profile-password__placeholder",
      value: `${this.props.store.state.user.second_name}`,
      events: {
        focusin,
        focusout,
      },
    }),

    this.children.inputDisplayName = new Input({
      classDiv: "form-info__block",
      label: "Имя в чате",
      name: "display_name",
      type: "text",
      classLabel: "form-info__block-title",
      classError: "error-input_bt",
      classInput: "form-info__block-desc profile-password__placeholder",
      value: `${this.props.store.state.user.display_name}`,
      events: {
        focusin,
        focusout,
      },
    }),


    this.children.inputPhone = new Input({
      classDiv: "form-info__block",
      label: "Телефон",
      name: "phone",
      type: "text",
      classLabel: "form-info__block-title",
      classError: "error-input_bt",
      classInput: "form-info__block-desc profile-password__placeholder",
      value: `${this.props.store.state.user.phone}`,
      events: {
        focusin,
        focusout,
      },
    }),

    this.children.button = new Button({
      label: "Сохранить",
      class: "button form-info__btn-save",
      events: { click: submit },
    }),

    this.children.imgBackArrow = new Img({
      srcImg: imgBackArrow,
      class: "profile__panel-circle",
      alt: "back-arrow",
      width: "35",
      height: "35",
      events: {
        click: (event) => {
          event.preventDefault();
          this.props.router.go('/settings')
        }
      }
    });
  }
  render() {
    return this.compile(template, {...this.props});
  }
}

export default withRouter(withStore(ProfileData));
