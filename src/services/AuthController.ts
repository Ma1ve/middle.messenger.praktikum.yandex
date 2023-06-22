import AuthApi, { SignInData, SignUpData } from "../api/AuthApi";
import { UserDTO } from "../api/api.types";
import { Dispatch } from "../core/Store/store";
import { AppState } from "../core/Store/store.types";
import { apiHasError} from "../utils/apiHasError";
import ChatController from "./ChatController";

class AuthController {

  async signIn( dispatch: Dispatch<AppState>, state: AppState, action: SignInData ) {
    try {

      const response = await AuthApi.signIn(action);

      if (apiHasError(response)) {
        dispatch({ loginFormError: response.response.reason });
        return;
      }

      const responseUser = await AuthApi.getUser();

      const responseChats = await ChatController.getChats(dispatch);

      console.log(responseChats, 'responseChats')

      dispatch({ loginFormError: null });

      if (apiHasError(responseUser)) {
        dispatch(this.logout);
        return;
      }


      dispatch({ user: responseUser.response });

      window.router.go('#messenger');

    } catch (error) {
      console.log(error)
    }
  }

  async signUp(dispatch: Dispatch<AppState>, state: AppState, action: SignUpData ) {
    try {

      const response = await AuthApi.signUp(action);

      if (apiHasError(response)) {
        dispatch({ registrationFormError: response.response.reason });
        return;
      }

      const responseUser = await AuthApi.getUser();

      dispatch({ registrationFormError: null });

      if (apiHasError(responseUser)) {
        return;
      }

      dispatch({ user: responseUser.response });

      window.router.go('#messenger');

    } catch (error) {
      console.log(error)
    }
  }

  async logout(dispatch: Dispatch<AppState>) {
    try {

      await AuthApi.logout();

      dispatch({ user: null });

      window.router.go('#login');

    } catch (error) {
      console.log(error);
    }
  }
}

export default new AuthController();
