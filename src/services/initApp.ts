
import AuthApi from "../api/AuthApi";

import  type { Dispatch } from "../core/Store/store";
import { AppState } from "../core/Store/store.types";
import { apiHasError} from "../utils/apiHasError";
import ChatController from "./ChatController";


export async function initApp(dispatch: Dispatch<AppState>) {
  try {


    const responseUser = await AuthApi.getUser();

    if (apiHasError(responseUser)) {
      console.log('Error response')
      window.router.go('#login')
      return;
    }

    let newResponseUser = responseUser

    if (responseUser.response.display_name === 'null' || !responseUser.response.display_name) {
      newResponseUser = {...responseUser.response, display_name: responseUser.response.first_name}
    }

    await ChatController.getChats(dispatch);


    dispatch({user: newResponseUser.response })


  } catch (err) {
    console.log(err)
  } finally {
    dispatch({ appIsInited: true });
  }
}
