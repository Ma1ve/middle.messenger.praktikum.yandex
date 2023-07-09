import Block from "../../core/Block";

import Avatar from "../../components/Avatar";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Img from "../../components/Img";
import Loading from "../../components/Loading";

import template from "./profilePassword.hbs";

import imgBackArrow from "../../assets/img/back-arrow.png";

import { focusout, focusin, submit } from "../../core/validation";
import { withRouter } from "../../utils/withRouter";
import { withStore } from "../../utils/withStore";
import { BASE_URL } from "../../core/htttpTransport";

import "./profilePassword.scss";



interface ProfilePasswordProps {}

class ProfilePassword extends Block {
  constructor(props: ProfilePasswordProps) {
    super(props);
  }

  init() {

    this.children.Loading = new Loading({})

    this.children.avatar = new Avatar({
      name: `${this.props.store.state.user.display_name}`,
      img: `${BASE_URL}/resources${this.props.store.state.user.avatar}`,
    });

    this.children.inputOldPassword =  new Input({
        classDiv: "form-info__block",
        label: "Старый пароль",
        name: "oldPassword",
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

    this.children.inputNewPassword = new Input({
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

    this.children.inputRepeatPassword = new Input({
      classDiv: "form-info__block",
      label: "Новый пароль",
      name: "confirmPassword",
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

    this.children.button = new Button({
        label: "Сохранить",
        class: "button form-info__btn-save form-info__btn-save_mt160",
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
          this.props.router.go("/settings")
        }
      }
    });
  }
  render() {
    return this.compile(template, {...this.props});
  }
}

export default withRouter(withStore(ProfilePassword))
