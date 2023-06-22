import Block from "../../core/Block";
import { Button } from "../Button/button";
import { Img } from "../Img/img";
import { Input } from "../Input/input";

import template from "./modal.hbs";

import Close from '../../assets/img/close.svg'

import "./modal.scss";
import { withStore } from "../../utils/withStore";

interface ModalProps {
  modalTitle: string,
  input?: Input,
  btn: Button,
  isModalChat?: boolean,
  isModalProfile?: boolean,
  events?: Record<string, (e: MouseEvent) => void>;
}

class Modal extends Block {
  constructor(props: ModalProps) {
    super(props);
  }

  init() {

    this.children.close = new Img({
      srcImg: Close,
      alt: 'close',
      class: 'block-close',
      events: {
        click: () => {
          this.hide()
        }
       }
    })
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default withStore(Modal)
