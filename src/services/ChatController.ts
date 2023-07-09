import ChatApi, { ChatUserData } from "../api/ChatApi";
import ConnectionWS from "../api/ConnectionWS";
import UserApi, { UserDataSearch } from "../api/UserApi";

import { Dispatch } from "../core/Store/store";
import { AppState, DispatchStateHandler, IChat, User } from "../core/Store/store.types";
import { apiHasError} from "../utils/apiHasError";

class ChatController {

  private socket: ConnectionWS  | null;

  constructor() {
    this.socket = null;
  }

  socketConnection: DispatchStateHandler<number> = async(dispatch, state, action) => {
    try {

      dispatch({isLoading: true});

      const responseToken = await ChatApi.getToken(action)

      if (apiHasError(responseToken)) {
        dispatch({isLoading: false});
        alert("Token not found");

        return;
      }

      const chatId = action;
      dispatch({ chatId: chatId });

      if (state.chats) {
        const currentChat = state.chats.find((chat: IChat) => chat.id === chatId)
        dispatch({ currentChat: currentChat })
      }


      const userId = state.user!.id;

      if (this.socket) {
        this.socket.closeConnection();
      }

      const endpoint = `${userId}/${chatId}/${responseToken.response.token}`;
      this.socket = new ConnectionWS(endpoint);


    } catch (error) {
      console.log(error);
    }
  }


  sendMessage: DispatchStateHandler<string> = async (dispatch, _, action) => {

      if (this.socket) {
        this.socket.sendMessage(action);
      }

      this.getChats(dispatch)

  }


  getChats = async(dispatch?: Dispatch<AppState>) => {
    try {

      const response = await ChatApi.getChatInfo()

      if (dispatch) {
        dispatch({ chats: response.response });
      }

    } catch (error) {
      console.log(error)
    }
  }


  createChat: DispatchStateHandler<string> = async(dispatch, _, action) =>  {
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


  deleteChat: DispatchStateHandler<number> = async (dispatch, _, action) => {
    try {

      dispatch({isLoading: true});

      const response = await ChatApi.deleteChat(action);

       if (apiHasError(response)) {
        alert(response.response.reason)
        dispatch({ isLoading: false, modalFormError: response.response.reason });
        return;
      }

      dispatch({chatId: null, currentChat: null,  modalFormError: null});

      this.getChats(dispatch);

      dispatch({ isLoading: false });

    } catch (error) {
      console.log(error)
    }

  }


  deleteUser: DispatchStateHandler<UserDataSearch> = async (dispatch, _, action) => {
    try {

      dispatch({isLoading: true});

      const { loginUser, chatId } = action;

      const responseCurrentUser = await UserApi.searchUser(loginUser);
      const currentUser = responseCurrentUser.response.filter((user: User) => user.login === loginUser)


      if (!currentUser.length) {
        alert("There is no such user")
        dispatch({ isLoading: false, modalFormError: "There is no such user" });
        return;
      }

      const userId = currentUser[0].id;

      dispatch({ modalFormError: null });

      const requestData: ChatUserData = {
      users: [userId],
      chatId: chatId,
    };


      const responseDeleteUser = await ChatApi.deleteUsers(requestData);

      if (apiHasError(responseDeleteUser)) {
        dispatch({ isLoading: false, modalFormError: responseDeleteUser.response.reason });
        return;
      }

      this.getChats(dispatch);


      dispatch({ isLoading: false, chatId: null })
      alert("User delete");

    } catch (error) {
      console.log(error)
    }
  }


  addUser: DispatchStateHandler<UserDataSearch> = async (dispatch, _, action) =>  {
    try {

       dispatch({ isLoading: true });

      const { loginUser, chatId } = action;

      const responseCurrentUser = await UserApi.searchUser(loginUser);
      const currentUser = responseCurrentUser.response.filter((user: User) => user.login === loginUser)

      if (!currentUser.length) {
        alert("There is no such user")
        dispatch({ isLoading: false, modalFormError: "There is no such user" });
        return;
      }


      const userId = currentUser[0].id;

      dispatch({ modalFormError: null });

      const requestData: ChatUserData = {
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
      alert("User add");

    } catch (error) {
      console.log(error)
    }
  }


  changeAvatar: DispatchStateHandler<FormData> = async (dispatch, _, action) => {
    try {

      dispatch({ isLoading: true });

      const responseAvatar = await ChatApi.changeAvatar(action);

      const currentResponseAvatar = JSON.parse(responseAvatar.response)


      if (currentResponseAvatar && currentResponseAvatar.reason) {

        console.log(responseAvatar)
        alert(currentResponseAvatar.reason)
         dispatch({ isLoading: false, avatarFormError: responseAvatar.response.reason });
        return;
      }

      const response = await ChatApi.getChatInfo()
      dispatch({ chats: response.response });

      alert("Avatar changed");
      dispatch({ isLoading: false });

    } catch (error) {
      alert("Incorrect avatar")
      dispatch({ isLoading: false });
       console.log(error)
    }
  }

}

export default new ChatController();


