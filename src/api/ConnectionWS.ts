import { withRouter } from "../utils/withRouter";
import { withStore } from "../utils/withStore";

const BASE_SOCKET_URL = 'wss://ya-praktikum.tech/ws/chats/';


class ConnectionWS {
  protected socket?: WebSocket;
  protected timerId?: NodeJS.Timeout;

  constructor(endpoint: string) {
    this.initSocket(endpoint);
  }

  private initSocket(endpoint: string) {
    this.socket = new WebSocket(`${BASE_SOCKET_URL}${endpoint}`);
    this.timerId = undefined;
    this.setListeners();
  }

  private setListeners() {
    if (!this.socket) {
      return;
    }

    this.socket.addEventListener('open', () => {
      console.log('Соединение установлено');

      clearInterval(this.timerId);
      this.setPing();
      this.getPrevMessages('0');
    });

    this.socket.addEventListener('close', (event) => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
          window.store.dispatch({ ActiveMessages: [] });
      } else {
        console.log('Обрыв соединения');
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);

      console.log('Соединение закрыто');
    });

    this.socket.addEventListener('message', (event) => {
      console.log('Получены данные', event.data);
      const data = JSON.parse(event.data);

      if (data && data.type !== 'error' && data.type !== 'pong' && data.type !== 'user connected') {
        console.log(data, 'data')

        if (Array.isArray(data)) {
           data.sort((a, b) => {
            return Date.parse(a.time) - Date.parse(b.time);
          });
        }

        if (Array.isArray(data)) {
          window.store.dispatch({ ActiveMessages: data });
          console.log(window.store.state, 'STORE STATE 1');
        } else {
          window.store.dispatch({ ActiveMessages: [...window.store.state.ActiveMessages, data] });
          console.log(window.store.state, 'STORE STATE 2');
        }
      }
    });

    this.socket.addEventListener('error', (event) => {
      console.log('Ошибка', event);
    });
  }

  public sendMessage(message: string) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(
        JSON.stringify({
          content: message,
          type: 'message',
        })
      );
    } else {
      console.log('Сокет не открыт, невозможно отправить сообщение.');
    }
  }

  public getPrevMessages(count: string) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(
        JSON.stringify({
          content: count,
          type: 'get old',
        })
      );
    } else {
      console.log('Сокет не открыт, невозможно запросить предыдущие сообщения.');
    }
  }

  public closeConnection() {
    if (this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)) {
      this.socket.close();
      clearInterval(this.timerId);
      this.socket = undefined;
      this.timerId = undefined;
    } else {
      console.log('Сокет не открыт или уже закрыт.');
    }
  }

  private setPing() {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.timerId = setInterval(() => {
        this.socket!.send(JSON.stringify({ type: 'ping' }));
      }, 2000);
    }
  }
}

export default ConnectionWS;


// class ConnectionWS {
//   protected socket: WebSocket;
//   protected timerId?: NodeJS.Timeout;

//   constructor(endpoint: string) {
//     this.socket = new WebSocket(`${BASE_SOCKET_URL}${endpoint}`);
//     this.timerId;

//     this.init();
//   }

//   private init() {
//     this.setListeners();
//   }

//   private setListeners() {

//     if (!this.socket) {
//       return;
//     }

//     this.socket.addEventListener('open', () => {
//       console.log('Соединение установлено');

//       clearInterval(this.timerId);
//       this.setPing();
//       this.getPrevMessages('0');
//     });

//     this.socket.addEventListener('close', (event) => {
//       if (event.wasClean) {
//         console.log('Соединение закрыто чисто');
//         // store.set('activeChat.messages', []);
//       } else {
//         console.log('Обрыв соединения');
//       }

//       console.log(`Код: ${event.code} | Причина: ${event.reason}`);

//        console.log('Соединение закрыто');
//     });

//     this.socket.addEventListener('message', (event) => {
//       console.log('Получены данные', event.data);
//       const data = JSON.parse(event.data);

//       if (data && data.type !== 'error' && data.type !== 'pong' && data.type !== 'user connected') {
//         console.log(data, 'data')
//         // sortMessages(data);
//         // transformDateInMsg(data);

//         if (Array.isArray(data)) {
//           window.store.dispatch({ActiveMessages: data});
//           console.log(window.store.state, 'STORE STATE 1')
//         } else {
//           window.store.dispatch({ActiveMessages: [...window.store.state.ActiveMessages]});
//            console.log(window.store.state, 'STORE STATE 2 ')
//           // store.set('activeChat.messages', [...store.getState().activeChat.messages, data]);
//         }
//       }
//     });

//     this.socket.addEventListener('error', (event) => {
//       console.log('Ошибка', event);
//     });
//   }

//   public sendMessage(message: string) {
//     this.socket.send(
//       JSON.stringify({
//         content: message,
//         type: 'message',
//       })
//     );
//   }

//   public getPrevMessages(count: string) {
//     this.socket.send(
//       JSON.stringify({
//         content: count,
//         type: 'get old',
//       })
//     );
//   }

//   public closeConnection() {
//       this.socket.close();
//   }

//   private setPing() {
//       this.timerId = setInterval(() => {
//         this.socket.send(JSON.stringify({ type: 'ping' }));
//       }, 2000);
//   }
// }


// export default ConnectionWS;
