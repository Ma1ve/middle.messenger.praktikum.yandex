import Block from "../../core/Block";
import AuthController from "../../services/AuthController";

import { withStore } from "../../utils/withStore";
import { withRouter } from "../../utils/withRouter";

import Avatar from "../../components/Avatar";
import Link from "../../components/Link";
import Input from "../../components/Input";
import Img from "../../components/Img";
import Modal from "../../components/Modal";

import template from "./profile.hbs";

import imgBackArrow from "../../assets/img/back-arrow.png";

import "./profile.scss";
import { BASE_URL } from "../../core/htttpTransport";

interface ProfileProps {}
class Profile extends Block {
  constructor(props: ProfileProps) {
    super(props);
  }

  init() {
    this.children.avatar = new Avatar({
      name: "Илья",
      img: `${BASE_URL}/resources${this.props.store.state.user.avatar}`,
    });

    this.children.inputEmail =  new Input({
      classDiv: "form-info__block",
      label: "Почта",
      name: "email",
      type: "email",
      classLabel: "form-info__block-title",
      classError: "error-input_bt",
      classInput: "form-info__block-desc profile-password__placeholder",
      value: `${this.props.store.state.user.email}`,
      readonly: true,
    }),

    this.children.inputLogin =  new Input({
      classDiv: "form-info__block",
      label: "Логин",
      name: "login",
      type: "text",
      classLabel: "form-info__block-title",
      classError: "error-input_bt",
      classInput: "form-info__block-desc profile-password__placeholder",
      value: `${this.props.store.state.user.login}`,
      readonly: true,
    }),

    this.children.inputFirstName = new Input({
      classDiv: "form-info__block",
      label: `Имя`,
      name: "first_name",
      type: "text",
      classLabel: "form-info__block-title",
      classError: "error-input_bt",
      classInput: "form-info__block-desc profile-password__placeholder",
      value: `${this.props.store.state.user.first_name}`,
      readonly: true,
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
      readonly: true,
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
          readonly: true,
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
      readonly: true,
    }),

    this.children.linkChangeData = new Link({
      href: "/profile/data",
      class: "link profile__info-block-title",
      label: "Изменить данные",
       events: {
        click: (event) => {
          event.preventDefault();
          this.props.router.go('#settings/data')
        }
      }

    });

    this.children.linkChangePassword = new Link({
      href: "/profile/password",
      class: "link profile__info-block-title",
      label: "Изменить пароль",
      events: {
        click: (event) => {
          event.preventDefault();
          this.props.router.go('#settings/password')
        }
      }
    });

    this.children.linkExit = new Link({
      label: 'Выход',
      class: "link profile__info-block-title_red",
      events: {
        click: (event) => {
          event.preventDefault();
          window.store.dispatch(AuthController.logout)
        }
      }

    });

    this.children.imgBackArrow = new Img({
      srcImg: imgBackArrow,
      class: "profile__panel-circle",
      alt: "back-arrow",
      width: "35",
      height: "35",
      events: {
        click: (event) => {
          event.preventDefault();
          this.props.router.go('#messenger')
        }
      }
    })
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}

export default withRouter(withStore(Profile))
    // <div class="blog-post">
    //     <div class="blog-post__title">Description </div>
    //     <div class="blog-post__text">first name: {{store.state.user.firstName}}</div>
    //     <div class="blog-post__text">phone number: {{store.state.user.phone}}</div>
    //     <div class="blog-post__text">email: {{store.state.user.email}}</div>
    //     <div class="blog-post__text">login: {{store.state.user.login}}</div>
    //     <div class="blog-post__text">id: {{store.state.user.id}}</div>
    //     {{{logoutButton}}}
    // </div>
