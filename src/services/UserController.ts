import AuthAPI from "../api/AuthApi";
import UserApi, { SearchUserProps, UpdatePassword, UpdateUserData } from "../api/UserApi";
import { Dispatch } from "../core/Store/store";
import { AppState } from "../core/Store/store.types";
import { apiHasError } from "../utils/apiHasError";

class UserController {
  async updateUser( dispatch: Dispatch<AppState>, state: AppState, action: UpdateUserData ) {
    try {
      const response = await UserApi.updateUser(action);

      if (apiHasError(response)) {
        dispatch({ profileFormError: response.response.reason });
        return;
      }

      const responseUser = await AuthAPI.getUser();

      dispatch({ profileFormError: null });

      if (apiHasError(responseUser)) {
         dispatch({ profileFormError: response.response.reason });
        return;
      }

      dispatch({ user: responseUser.response });

      window.router.go('#settings');

    } catch (error) {
      console.log(error)
    }


  }

  async updateAvatar(dispatch: Dispatch<AppState>, state: AppState, action: FormData) {
    try {

      const response = await UserApi.updateAvatar(action);

      if (apiHasError(response)) {
        console.log(response)
           console.log(response.response.reason)
         dispatch({ avatarFormError: response.response.reason });
        return;
      }

      const responseUser = await AuthAPI.getUser();

      dispatch({ avatarFormError: null });

      if (apiHasError(responseUser)) {
         dispatch({ avatarFormError: response.response.reason });
        return;
      }

      dispatch({ user: responseUser.response });

      window.router.go('#settings');


    } catch (error) {
       console.log(error)
    }
  }

  async updatePassword(dispatch: Dispatch<AppState>, state: AppState, action: UpdatePassword) {
    try {

      if (action.newPassword !== action.confirmPassword) {
        dispatch({ passwordFormError: 'Please check the new password and repeat the password' });
         return;
      }

      const response = await UserApi.updatePassword(action);

      if (apiHasError(response)) {
        dispatch({ passwordFormError: response.response.reason });
        return;
      }

      dispatch({ passwordFormError: null });

      window.router.go('#settings');

    } catch (error) {
      console.log(error)
    }
  }

  async searchUser(dispatch: Dispatch<AppState>, state: AppState, action: string) {
    try {

      return await UserApi.searchUser(action)

    } catch (error) {
      console.log(error)
    }
  }

}

export default new UserController()
