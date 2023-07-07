import Block from "../../core/Block";

import ChatController from "../../services/ChatController";

import ChatTab from "../../components/ChatTab";
import Img from "../../components/Img";
import Input from "../../components/Input";
import MenuTabs from "../../components/MenuTabs";
import Button from "../../components/Button";
import Link from "../../components/Link";
import Modal from "../../components/Modal";
import UserMessage from "../../components/UserMessage";
import Loading from "../../components/Loading";

import template from "./chat.hbs";

import imgArrowRight from "../../assets/img/arrow-right.svg";
import imgPlus from "../../assets/img/add-plus.png";
import imgDelete from "../../assets/img/delete.svg";
import imgPhoto from "../../assets/img/photo.png";
import imgPhotoClip from "../../assets/img/photo-clip.svg";
import imgBackArrow from "../../assets/img/back-arrow.png";
import dotsMenu from "../../assets/img/dots-menu-svg.svg"

import { withStore } from "../../utils/withStore";
import { IChat, Message } from "../../core/Store/store.types";
import { focusin, focusout, keydown } from "../../core/validation";
import { withRouter } from "../../utils/withRouter";
import { getCurrentTime } from "../../utils/getCurrentTime";
import { BASE_URL } from "../../core/htttpTransport";

import "./chat.scss";



interface ChatProps {}

class Chat extends Block {
  constructor(props: ChatProps) {
    super(props);

    if (this.props.store.getState().currentChat) {
      this.setProps({chatId: this.props.store.getState().currentChat!.id})
      this.setProps({currentChat:this.props.store.getState().currentChat});
    }

  }


  async updateChatTabs() {
    const chats = this.props.store.state.chats;


    if (!chats) {
      return;
    }


    this.children.chatTabs = chats.map((chat: IChat) => {

      let currentTime;
      let displayName;

      if (chat.last_message) {
        currentTime = getCurrentTime(chat.last_message.time as number);

        const userLastMessage = chat.last_message.user;

        if (userLastMessage) {
          displayName = userLastMessage.display_name == "null" ? userLastMessage.first_name : userLastMessage.display_name;
        }

      }


      let avatar = "";
      if (chat.avatar) {
        avatar = `${BASE_URL}/resources${chat.avatar}`;
      }

      return new ChatTab({
        name: `${chat.title}`,
        text: `${chat.last_message ? chat.last_message.content : "..."}`,
        time: `${currentTime ? currentTime : ""}`,
        classChoose: `${chat.id === this.props.store.state.chatId ? "active": ""}`,
        spanText: `${displayName ? displayName + ": " : ""}`,
        avatar: `${avatar}`,
        // spanText: `${chat.last_message ? chat.last_message.user.display_name + ':' : ''} `,
        // classNotificatonDisplayNone: `${!!chat.unread_count ? '': 'notification-dn'}`,
        // notificaton: `${!!chat.unread_count ? chat.unread_count: ''}`,
        events: {
          click: async () => {
            window.store.dispatch(ChatController.socketConnection.bind(ChatController), chat.id)

            this.setProps({chatId: chat.id})
            this.setProps({currentChat: chat})

          }
        }
      });

    })

  }

    updateActiveMessage() {
      const activeMessages = this.props.store.state.ActiveMessages;

      if (!activeMessages) {
        return;
      }

       this.children.userMessages = activeMessages.map((message: Message) => {
         let currentTime;
          if (message.time) {
            currentTime = getCurrentTime(message.time)
          }

          return new UserMessage({
            userMessage: `${message.content}`,
            userTime: `${currentTime}`,
            isOwnUserMessage: `${this.props.store.state.user?.id === message.user_id ? "active": ""}`
          });
       })

    }


  init() {

    this.children.Loading = new Loading({})

    this.children.modalAddChat = new Modal({
      modalTitle: "Создать чат",
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
        class: "block-modal__btn button_mt20",
        label: "Создать",
        events: {
          click:  () => {
            const input = document.querySelector(".input-modal") as HTMLInputElement;
            window.store.dispatch(ChatController.createChat.bind(ChatController), input.value);

             this.children.modalAddChat.hide();
          }
        }
      })
    });


    this.children.modalAddUser = new Modal({
      modalTitle: "Добавить пользователя",
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
        class: "block-modal__btn button_mt20",
        label: "Добавить",
        events: {
          click: () => {
            const inputAddUser = document.querySelector(".input-add-user") as HTMLInputElement;

            window.store.dispatch(ChatController.addUser.bind(ChatController), { loginUser: inputAddUser.value, chatId: this.props.store.state.chatId });

            inputAddUser.value = ""

            this.children.modalAddUser.hide();
          }
        }
      })
    });



    this.children.modalChangeAvatar = new Modal({
        modalTitle: "Загрузите файл",
        isModalChat: false,
        btn:  new Button({
            class: "block-modal__btn",
            label: "Поменять",
            events: {
              click: () => {
                const fileInput = document.querySelector<HTMLInputElement>(".block-modal__file");
                const selectedFile = fileInput!.files![0];

                const form = new FormData();

                form.append("chatId", this.props.store.state.chatId);
                form.append("avatar", selectedFile);

                window.store.dispatch(ChatController.changeAvatar.bind(ChatController), form);

                this.children.modalChangeAvatar.hide();

              }
            }
          })
      });

    this.children.modalDeleteUser = new Modal({
      modalTitle: "Удалить пользователя",
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
        class: "block-modal__btn button_mt20",
        label: "Удалить",
        events: {
          click: () => {

            const inputDeleteUser = document.querySelector(".input-delete-user") as HTMLInputElement;

            window.store.dispatch(ChatController.deleteUser.bind(ChatController), { loginUser: inputDeleteUser.value, chatId: this.props.store.state.chatId });

            inputDeleteUser.value = ""

            this.children.modalDeleteUser.hide();

          }
        }
      })
    });


    this.children.modalDeleteChat = new Modal({
      modalTitle: "Удалить чат",
      isModalChat: true,

      btn: new Button({
        class: "block-modal__btn button_mt100",
        label: "Удалить",
        events: {
          click: () => {
            window.store.dispatch(ChatController.deleteChat.bind(ChatController), this.props.store.state.chatId);

            this.setProps({ chatId: null, currentChat: null });
            this.children.modalDeleteChat.hide();
          }
        }
      })
    });



    this.children.linkProfile = new Link({
      class: "chat__list-title",
      label: "Профиль",
      events: {
         click: (event) => {
          event.preventDefault();
          this.props.router.go("/settings")
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
      events: { focusin, focusout, keydown},
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

    //! Clip for photo | imgClip
    // this.children.imgClip = new Img({
    //   srcImg: imgClip,
    //   class: "chat-form__img-clip",
    //   alt: "clip",
    //    events: {
    //     click: () => {
    //       const clipMenu = document.querySelector('.chat-form__clip-menu');
    //       clipMenu?.classList.toggle('active')
    //     }
    //   }
    // });

    this.children.imgDotsMenu = new Img({
      srcImg: dotsMenu,
      alt: "dotsMenu",
      width: "50",
      height: "30",
      class: "img-dots",
      events: {
        click: () => {
          const clipMenu = document.querySelector(".span-menu__active");
          clipMenu?.classList.toggle("visible")
        }
      }
    })


    this.children.imgBackArrow = new Img({
      srcImg: imgBackArrow,
      class: "chat-form__img-arrow",
      alt: "photo",
      width: "28",
      height: "28",
      events: {

        click: () => {
          const inputValueMessage = document.querySelector(".input-message") as HTMLInputElement;

          if (inputValueMessage.value === "") {
            return;
          }

          window.store.dispatch(ChatController.sendMessage.bind(ChatController), inputValueMessage.value);
          inputValueMessage.value = ""

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
      textClip: "Добавить пользователя",
      events: {
        click: () => {
          this.children.modalAddUser.show();
        }
      }
    });



     this.children.menuUpTab_2 = new MenuTabs({
      imgClip: new Img({
        srcImg: imgPlus,
        class: "span-menu__active-block-img",
        alt: "add-plus",
        width: "22",
        height: "22",
      }),
      textClip: "Изменить аватар чата",
      events: {
        click: () => {
          this.children.modalChangeAvatar.show();
        }
      }
    });


    this.children.menuUpTab_3 = new MenuTabs({
      imgClip: new Img({
        srcImg: imgDelete,
        class: "span-menu__active-block-img",
        alt: "delete",
        width: "22",
        height: "22",
      }),
      textClip: "Удалить пользователя",
      events: {
        click: () => {
           this.children.modalDeleteUser.show();
        }
      }
    });

    this.children.menuUpTab_4 = new MenuTabs({
      imgClip: new Img({
        srcImg: imgDelete,
        class: "span-menu__active-block-img",
        alt: "delete",
      }),
      textClip: "Удалить чат",
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
      textClip: "Фото или Видео",
    });

  }


   render() {

    this.updateChatTabs();
    this.updateActiveMessage();


    return this.compile(template, { ...this.props });
  }
}

export default withRouter(withStore(Chat));




