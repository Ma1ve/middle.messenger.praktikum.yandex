
import AuthApi from "../api/AuthApi";

import  type { Dispatch } from "../core/Store/store";
import { AppState } from "../core/Store/store.types";
import { router } from "../router";
import { apiHasError} from "../utils/apiHasError";
import ChatController from "./ChatController";
import UserController from "./UserController";


export async function initApp(dispatch: Dispatch<AppState>) {
  try {
     dispatch({isLoading: true});

    const responseUser = await AuthApi.getUser();

    if (apiHasError(responseUser)) {
      dispatch({isLoading: false});
      console.log('Error response')
      router.go('/')
      return;
    }

    if (responseUser) {
      const path = window.location.pathname;
      if (path === '/' || path === '/sign-up') {
        router.go('/messenger')
      }
    }


    if (responseUser.response.display_name == 'null' || !responseUser.response.display_name) {

      window.store.dispatch(UserController.updateUser.bind(UserController), {...responseUser.response, display_name: responseUser.response.first_name})

    }

    await ChatController.getChats(dispatch);

    dispatch({user: responseUser.response })

    dispatch({isLoading: false});

  } catch (err) {
    console.log(err)
  } finally {
    dispatch({ appIsInited: true });
  }
}
