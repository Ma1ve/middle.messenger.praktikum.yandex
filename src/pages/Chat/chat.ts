import Block from "../../core/Block";

import Message from "../../components/Message";
import Img from "../../components/Img";

import template from "./chat.hbs";

import imgArrowRight from "../../assets/img/arrow-right.svg";
import imgPlus from "../../assets/img/add-plus.png";
import imgDelete from "../../assets/img/delete.svg";
import imgPhoto from "../../assets/img/photo.png";
import imgClip from "../../assets/img/clip.svg";
import imgPhotoClip from "../../assets/img/photo-clip.svg";
import imgFileClip from "../../assets/img/file-clip.svg";
import imgLocationClip from "../../assets/img/location-clip.svg";
import imgBackArrow from "../../assets/img/back-arrow.png";

import "./chat.scss";

export class Chat extends Block {
  constructor() {
    super();
  }

  init() {
    this.children.message_1 = new Message({
      name: "Андрей",
      text: "Изображение",
      time: "10:49",
      spanText: "",
      notificaton: "2",
    });

    this.children.message_2 = new Message({
      name: "Киноклуб",
      text: "стикер",
      time: "12:00",
      spanText: "Вы: ",
      classNotificatonDisplayNone: "notification-dn",
      notificaton: "",
    });

    this.children.message_3 = new Message({
      name: "Илья",
      text: "Друзья, у меня для вас особенный выпуск новостей!...",
      time: "10:49",
      spanText: "",
      notificaton: "2",
    });

    this.children.message_4 = new Message({
      name: "Андрей",
      text: "Изображение",
      time: "Пт",
      spanText: "",
      classNotificatonDisplayNone: "notification-dn",
      classChoose: "active",
      notificaton: "",
    });

    /* Image */

    this.children.imgPlus = new Img({
      srcImg: imgPlus,
      class: "chat__list-block-img",
      alt: "add-plus",
    });

    this.children.imgArrowRight = new Img({
      srcImg: imgArrowRight,
      alt: "arrow",
    });

    this.children.imgPlusAndSize = new Img({
      srcImg: imgPlus,
      class: "span-menu__active-block-img",
      alt: "add-plus",
      width: "22",
      height: "22",
    });

    this.children.imgArrowRight = new Img({
      srcImg: imgArrowRight,
      alt: "arrow",
    });

    this.children.imgDelete = new Img({
      srcImg: imgDelete,
      class: "span-menu__active-block-img",
      alt: "delete",
      width: "22",
      height: "22",
    });

    this.children.imgDelete_1 = new Img({
      srcImg: imgDelete,
      class: "span-menu__active-block-img",
      alt: "delete",
    });

    this.children.imgPhoto = new Img({
      srcImg: imgPhoto,
      class: "chat__message-user-img",
      alt: "photo",
    });

    this.children.imgClip = new Img({
      srcImg: imgClip,
      class: "chat-form__img-clip",
      alt: "clip",
    });

    this.children.imgPhotoClip = new Img({
      srcImg: imgPhotoClip,
      class: "span-menu__active-block-img",
      alt: "photo",
      width: "22",
      height: "22",
    });

    this.children.imgFileClip = new Img({
      srcImg: imgFileClip,
      class: "span-menu__active-block-img",
      alt: "file",
      width: "22",
      height: "22",
    });

    this.children.imgLocationClip = new Img({
      srcImg: imgFileClip,
      class: "span-menu__active-block-img",
      alt: "photo",
      width: "22",
      height: "22",
    });

    this.children.imgBackArrow = new Img({
      srcImg: imgBackArrow,
      class: "chat-form__img-arrow",
      alt: "photo",
      width: "28",
      height: "28",
    });
  }

  render() {
    return this.compile(template, {});
  }
}
