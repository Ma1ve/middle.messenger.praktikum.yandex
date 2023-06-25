import ChatController from "./ChatController";

import AuthApi, { SignInData, SignUpData } from "../api/AuthApi";
import { Dispatch } from "../core/Store/store";
import { AppState } from "../core/Store/store.types";
import { router } from "../router";
import { apiHasError} from "../utils/apiHasError";


class AuthController {

  async signIn( dispatch: Dispatch<AppState>, state: AppState, action: SignInData ) {
    try {

      dispatch({ isLoading: true })

      const response = await AuthApi.signIn(action);

      if (apiHasError(response)) {
        dispatch({ isLoading: false, loginFormError: response.response.reason });
        return;
      }

      const responseUser = await AuthApi.getUser();

      dispatch({ loginFormError: null });

      if (apiHasError(responseUser)) {
        dispatch({isLoading: false})
        dispatch(this.logout);
        return;
      }

      await ChatController.getChats(dispatch);

      dispatch({ isLoading: false, user: responseUser.response });

      router.go('/messenger');



    } catch (error) {
      console.log(error)
    }
  }

  async signUp(dispatch: Dispatch<AppState>, state: AppState, action: SignUpData ) {
    try {

      dispatch({ isLoading: true })

      const response = await AuthApi.signUp(action);

      if (apiHasError(response)) {
        dispatch({ isLoading: false, registrationFormError: response.response.reason });
        return;
      }

      let responseUser = await AuthApi.getUser();

      await ChatController.getChats(dispatch);

      dispatch({ registrationFormError: null });

      if (apiHasError(responseUser)) {
         dispatch({ isLoading: false })
        return;
      }


      let newResponse = responseUser.response;

      if (responseUser.response.display_name === 'null' || !responseUser.response.display_name) {
        newResponse = {...responseUser.response, display_name: responseUser.response.first_name}
      }

      dispatch({ isLoading: false, user: newResponse });

      router.go('/messenger');

    } catch (error) {
      console.log(error)
    }
  }

  async logout(dispatch: Dispatch<AppState>) {
    try {
      dispatch({ isLoading: true })
      await AuthApi.logout();

      dispatch({ isLoading: false, user: null, chatId: null, currentChat: null, ActiveMessages: null });

      router.go('/');

    } catch (error) {
      console.log(error);
    }
  }
}

export default new AuthController();
