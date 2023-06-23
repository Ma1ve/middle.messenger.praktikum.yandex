import Block from "../../core/Block";

import ChatTab from "../../components/ChatTab";
import Img from "../../components/Img";
import Input from "../../components/Input";
import MenuTabs from "../../components/MenuTabs";
import Button from "../../components/Button";
import Link from "../../components/Link";
import modal from "../../components/Modal/modal";

import template from "./chat.hbs";

import imgArrowRight from "../../assets/img/arrow-right.svg";
import imgPlus from "../../assets/img/add-plus.png";
import imgDelete from "../../assets/img/delete.svg";
import imgPhoto from "../../assets/img/photo.png";
import imgClip from "../../assets/img/clip.svg";
import imgPhotoClip from "../../assets/img/photo-clip.svg";
import imgBackArrow from "../../assets/img/back-arrow.png";
import dotsMenu from '../../assets/img/dots-menu-svg.svg'

import { focusin, focusout, submit } from "../../core/validation";
import { withRouter } from "../../utils/withRouter";

import "./chat.scss";

import ChatController from "../../services/ChatController";
import { withStore } from "../../utils/withStore";
import { IChat, Message } from "../../core/Store/store.types";


import UserMessage from "../../components/UserMessage";
import { Loading } from "../../components/Loading/loading";
import { getCurrentTime } from "../../utils/getCurrentTime";






interface ChatProps {}

class Chat extends Block {
  constructor(props: ChatProps) {
    super(props);
  }


  init() {

     // Решил для теста запихнуть логику создания чата и отрисовку сообщений сюда
    this.props.store.on('changed', () => {
      // console.log('%cstore UPDATED', 'background: #222; color: #red', nextState);
       if (this.props.store.state.chats) {


        this.children.chatTabs = this.props.store.state.chats.map((chat: IChat) => {

          //! Нахожу корректное время, когда было последнее сообщение (не обязательно)

          let currentTime;
          if (chat.last_message) {
            currentTime = getCurrentTime((chat.last_message as any).time)
          }


          //! отрисовываю каждый чат
          return new ChatTab({
            name: `${chat.title}`,
            text: `${chat.last_message ? chat.last_message.content : '...'}`,
            time: `${currentTime ? currentTime : ''}`,
            classChoose: `${chat.id === this.props.store.state.chatId ? 'active': ''}`,
            spanText: `${chat.last_message ? chat.last_message.user.display_name + ':' : ''} `,
            classNotificatonDisplayNone: `${!!chat.unread_count ? '': 'notification-dn'}`,
            notificaton: `${!!chat.unread_count ? chat.unread_count: ''}`,
            events: {
              click: () => {

                window.store.dispatch(ChatController.socketConnection.bind(ChatController), chat.id)

                this.setProps({chatId: chat.id})
                this.setProps({currentChat: chat})

              }
            }
          });
      });



    }

      if (this.props.store.state.ActiveMessages) {
          //! Отрисовка сообщений в чате (ActiveMessages которые либо были, либо я их отправляю в данный момент)
            this.children.userMessages = this.props.store.state.ActiveMessages.map((message: Message) => {

            let currentTime;
            if (message.time) {
              currentTime = getCurrentTime(message.time)
            }


            return new UserMessage({
                userMessage: `${message.content}`,
                userTime: `${currentTime}`,
                isOwnUserMessage: `${this.props.store.state.user?.id === message.user_id ? 'active': ''}`
              });
            })
          }
    });



    if (this.props.store.state.chats) {

        this.children.chatTabs = this.props.store.state.chats.map((chat: IChat) => {

          //! Нахожу корректное время, когда было последнее сообщение (не обязательно)

          let currentTime;
          if (chat.last_message) {
            currentTime = getCurrentTime((chat.last_message as any).time)
          }



          //! отрисовываю каждый чат
          return new ChatTab({
            name: `${chat.title}`,
            text: `${chat.last_message ? chat.last_message.content : '...'}`,
            time: `${currentTime ? currentTime : ''}`,
            classChoose: `${chat.id === this.props.store.state.chatId ? 'active': ''}`,
            spanText: `${chat.last_message ? chat.last_message.user.display_name + ':' : ''} `,
            classNotificatonDisplayNone: `${!!chat.unread_count ? '': 'notification-dn'}`,
            notificaton: `${!!chat.unread_count ? chat.unread_count: ''}`,
            events: {
              click: () => {

                  window.store.dispatch(ChatController.socketConnection.bind(ChatController), chat.id)
                  this.setProps({chatId: chat.id})
                  this.setProps({currentChat: chat})
                }

            }
          });
      });
    }



    this.children.Loading = new Loading({})

    this.children.modalAddChat = new modal({
      modalTitle: 'Создать чат',
      isModalChat: true,
      input: new Input({
        classDiv: "form-login__wrapper input_mb",
        name: "title",
        type: "text",
        classLabel: "form-registration__title",
        classInput: "input input-modal form-login__input error-login__input",
        placeholder: "Введите название чата",
      }),
      btn: new Button({
        class: 'block-modal__btn button_mt20',
        label: 'Создать',
        events: {
          click:  () => {
            const input = document.querySelector('.input-modal') as HTMLInputElement;
            window.store.dispatch(ChatController.createChat.bind(ChatController), input.value);
          }
        }
      })
    });


    this.children.modalAddUser = new modal({
      modalTitle: 'Добавить пользователя',
      isModalChat: true,
      input: new Input({
        classDiv: "form-login__wrapper input_mb",
        name: "login",
        type: "text",
        classLabel: "form-registration__title",
        classInput: "input input-add-user form-login__input error-login__input",
        placeholder: "Введите логин пользователя",
        events: {
          focusout, focusin
        }
      }),
      btn: new Button({
        class: 'block-modal__btn button_mt20',
        label: 'Добавить',
        events: {
          click: () => {
            const input = document.querySelector('.input-add-user') as HTMLInputElement;

            window.store.dispatch(ChatController.addUser.bind(ChatController), { loginUser: input.value, chatId: this.props.store.state.chatId })
          }
        }
      })
    });

    this.children.modalDeleteUser = new modal({
      modalTitle: 'Удалить пользователя',
      isModalChat: true,
      input: new Input({
        classDiv: "form-login__wrapper input_mb",
        name: "login",
        type: "text",
        classLabel: "form-registration__title",
        classInput: "input input-delete-user form-login__input error-login__input",
        placeholder: "Введите логин пользователя",
        events: {
          focusout, focusin
        }
      }),
      btn: new Button({
        class: 'block-modal__btn button_mt20',
        label: 'Удалить',
        events: {
          click: () => {

            const input = document.querySelector('.input-delete-user') as HTMLInputElement;

            window.store.dispatch(ChatController.deleteUser.bind(ChatController), { loginUser: input.value, chatId: this.props.store.state.chatId })
          }
        }
      })
    });


    this.children.modalDeleteChat = new modal({
      modalTitle: 'Удалить чат',
      isModalChat: true,

      btn: new Button({
        class: 'block-modal__btn button_mt100',
        label: 'Удалить',
        events: {
          click: () => {
            window.store.dispatch(ChatController.deleteChat.bind(ChatController), this.props.store.state.chatId)
          }
        }
      })
    });



    this.children.linkProfile = new Link({
      class: 'chat__list-title',
      label: 'Профиль',
      events: {
         click: (event) => {
          event.preventDefault();
          this.props.router.go('/settings')
        }
      }
    })

    this.children.inputMessage = new Input({
      classDiv: "chat__block-input_w100",
      label: "",
      name: "message",
      type: "text",
      classLabel: "",
      classError: "error-input__message",
      classInput: "input input-message chat-form__input",
      placeholder: "Cообщение",
      events: { focusin, focusout },
    });

    /* Image */

    this.children.imgPlus = new Img({
      srcImg: imgPlus,
      class: "chat__list-block-img",
      alt: "add-plus",
      events: {
        click: () => {
          this.children.modalAddChat.show();
        }
      }
    });

    this.children.imgArrowRight = new Img({
      srcImg: imgArrowRight,
      alt: "arrow",
    });


    this.children.imgArrowRight = new Img({
      srcImg: imgArrowRight,
      alt: "arrow",
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
       events: {
        click: () => {
          const clipMenu = document.querySelector('.chat-form__clip-menu');
          clipMenu?.classList.toggle('active')
        }
      }
    });

    this.children.imgDotsMenu = new Img({
      srcImg: dotsMenu,
      alt: 'dotsMenu',
      width: '50',
      height: '30',
      class: 'img-dots',
      events: {
        click: () => {
          const clipMenu = document.querySelector('.span-menu__active');
          clipMenu?.classList.toggle('visible')
        }
      }
    })



    this.children.imgBackArrow = new Img({
      srcImg: imgBackArrow,
      class: "chat-form__img-arrow",
      alt: "photo",
      width: "28",
      height: "28",
      events: { click: () => {
        const inputValueMessage = document.querySelector('.input-message') as HTMLInputElement;

        window.store.dispatch(ChatController.sendMessage.bind(ChatController), inputValueMessage.value);
        inputValueMessage.value = ''

      } },
    });

    this.children.menuUpTab_1 = new MenuTabs({
      imgClip: new Img({
        srcImg: imgPlus,
        class: "span-menu__active-block-img",
        alt: "add-plus",
        width: "22",
        height: "22",
      }),
      textClip: 'Добавить пользователя',
      events: {
        click: () => {
          this.children.modalAddUser.show();
        }
      }
    });

    this.children.menuUpTab_2 = new MenuTabs({
      imgClip: new Img({
        srcImg: imgDelete,
        class: "span-menu__active-block-img",
        alt: "delete",
        width: "22",
        height: "22",
      }),
      textClip: 'Удалить пользователя',
      events: {
        click: () => {
           this.children.modalDeleteUser.show();
        }
      }
    });

    this.children.menuUpTab_3 = new MenuTabs({
      imgClip: new Img({
        srcImg: imgDelete,
        class: "span-menu__active-block-img",
        alt: "delete",
      }),
      textClip: 'Удалить чат',
      events: {
        click: () => {
          this.children.modalDeleteChat.show();
        }
      }
    });

     this.children.menuDowmTab = new MenuTabs({
      imgClip: new Img({
        srcImg: imgPhotoClip,
        class: "span-menu__active-block-img",
        alt: "photo",
        width: "22",
        height: "22",
      }),
      textClip: 'Фото или Видео',
      events: {
        click: () => {}
      }
    });

  }


  render() {

    return this.compile(template, { ...this.props });
  }
}

export default withRouter(withStore(Chat));




