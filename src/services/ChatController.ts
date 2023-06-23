import ChatApi from "../api/ChatApi";
import ConnectionWS from "../api/ConnectionWS";
import UserApi from "../api/UserApi";


import { Dispatch } from "../core/Store/store";
import { AppState } from "../core/Store/store.types";
import { apiHasError} from "../utils/apiHasError";

class ChatController {

  private socket: ConnectionWS  | null;

  constructor() {
    this.socket = null;
  }

  async socketConnection(dispatch: Dispatch<AppState>, state: AppState, action: string) {
  try {

    dispatch({isLoading: true});

    const responseToken = await ChatApi.getToken(action)

    if (apiHasError(responseToken)) {
      dispatch({isLoading: false});
      alert('Token not found');

      return;
    }

    const chatId = action;
    dispatch({ chatId: chatId });

    const currentChat = state.chats.find((el: {id: string}) => el.id === chatId)
    dispatch({ currentChat: currentChat })

    const userId = state.user!.id;

    if (this.socket) {
      this.socket.closeConnection();
      // this.socket = null
    }

    const endpoint = `${userId}/${chatId}/${responseToken.response.token}`;
    this.socket = new ConnectionWS(endpoint);

    // dispatch({isLoading: false})


  } catch (error) {
    console.log(error);
  }
}

  async sendMessage(dispatch: Dispatch<AppState>, state: AppState, action: string) {
    console.log(action)
    if (this.socket) {
      this.socket.sendMessage(action);
    }
  }


  async getChats(dispatch: Dispatch<AppState>) {
    try {

      const response = await ChatApi.getChatInfo()

      // if (dispatch) {
         dispatch({ chats: response.response });
      // }



    } catch (error) {
      console.log(error)
    }
  }

  async createChat(dispatch: Dispatch<AppState>, state: AppState, action: string) {
    try {

      dispatch({isLoading: true});

      const response = await ChatApi.createChat(action);

       if (apiHasError(response)) {
        dispatch({ isLoading: false, modalFormError: response.response.reason });
        return;
      }

      await this.getChats(dispatch);

      dispatch({isLoading: false})

    } catch (error) {
      console.log(error)
    }
  }

  async deleteChat(dispatch: Dispatch<AppState>, state: AppState, action: number) {
    try {
      dispatch({isLoading: true});

      const response = await ChatApi.deleteChat(action);

       if (apiHasError(response)) {
        dispatch({ isLoading: false, modalFormError: response.response.reason });
        return;
      }

      dispatch({ modalFormError: null });

      this.getChats(dispatch);

      dispatch({ isLoading: false });

    } catch (error) {
      console.log(error)
    }

  }

  async deleteUser(dispatch: Dispatch<AppState>, state: AppState, action: {loginUser: string, chatId: number}) {
    try {

      dispatch({isLoading: true});

      const { loginUser, chatId } = action;

      const responseCurrentUser = await UserApi.searchUser(loginUser);

      if (!responseCurrentUser.response.length) {
        dispatch({ isLoading: false, modalFormError: 'There is no such user' });
        return;
      }

      const userId = responseCurrentUser.response[0].id;

      dispatch({ modalFormError: null });

      const requestData: Record<any, number[] | number> = {
      users: [userId],
      chatId: chatId,
    };

      const responseDeleteUser = await ChatApi.deleteUsers(requestData);

      if (apiHasError(responseDeleteUser)) {
        dispatch({ isLoading: false, modalFormError: responseDeleteUser.response.reason });
        return;
      }

      this.getChats(dispatch);

      dispatch({ isLoading: false })

    } catch (error) {
      console.log(error)
    }
  }

  async addUser(dispatch: Dispatch<AppState>, state: AppState, action: {loginUser: string, chatId: number}) {
    try {

       dispatch({ isLoading: true });

      const { loginUser, chatId } = action;

      const responseCurrentUser = await UserApi.searchUser(loginUser);

      if (!responseCurrentUser.response.length) {
        dispatch({ isLoading: false, modalFormError: 'There is no such user' });
        return;
      }

      const userId = responseCurrentUser.response[0].id;

      dispatch({ modalFormError: null });

      const requestData: Record<any, number[] | number> = {
        users: [userId],
        chatId: chatId,
      };

      const responseDeleteUser = await ChatApi.addUsers(requestData);

      if (apiHasError(responseDeleteUser)) {
        dispatch({ isLoading: false, modalFormError: responseDeleteUser.response.reason });
        return;
      }

      this.getChats(dispatch);

      dispatch({ isLoading: false });

    } catch (error) {
      console.log(error)
    }
  }

}

export default new ChatController();


