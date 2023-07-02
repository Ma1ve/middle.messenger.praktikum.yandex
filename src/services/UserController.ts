import AuthAPI from "../api/AuthApi";

import UserApi, { UpdatePassword, UpdateUserData } from "../api/UserApi";
import {  DispatchStateHandler } from "../core/Store/store.types";
import { router } from "../router";
import { apiHasError } from "../utils/apiHasError";

class UserController {

  updateUser: DispatchStateHandler<UpdateUserData> = async ( dispatch, _, action ) =>  {
    try {

       dispatch({ isLoading: true })

      const response = await UserApi.updateUser(action);

      if (apiHasError(response)) {
        dispatch({ profileFormError: response.response.reason });
        return;
      }

      if (response.response.display_name == "null") {
         dispatch({ isLoading: false, profileFormError: "Display name must not be null" });
        return;
      }

      const responseUser = await AuthAPI.getUser();

      dispatch({ profileFormError: null });

      if (apiHasError(responseUser)) {
         dispatch({ isLoading: false,  profileFormError: responseUser.response.reason });
        return;
      }

      dispatch({ isLoading: false, user: responseUser.response });

      router.go("/settings");

    } catch (error) {
      console.log(error)
    }


  }

   updateAvatar: DispatchStateHandler<FormData> = async (dispatch, _, action) => {
    try {

      dispatch({ isLoading: true });

      const response = await UserApi.updateAvatar(action);

      if (apiHasError(response)) {
         dispatch({ isLoading: false, avatarFormError: response.response.reason });
        return;
      }

      const responseUser = await AuthAPI.getUser();

      dispatch({ avatarFormError: null });

      if (apiHasError(responseUser)) {
         dispatch({ isLoading: false, avatarFormError: response.response.reason });
        return;
      }

      dispatch({ isLoading: false, user: responseUser.response });

      router.go("/settings");


    } catch (error) {
       dispatch({ isLoading: false});
       console.log(error)
    }
  }


  updatePassword:  DispatchStateHandler<UpdatePassword> = async (dispatch, _, action) => {
    try {

      dispatch({ isLoading: true })

      if (action.newPassword !== action.confirmPassword) {
        dispatch({ isLoading: false, passwordFormError: "Please check the new password and repeat the password" });
         return;
      }

      const response = await UserApi.updatePassword(action);

      if (apiHasError(response)) {
        dispatch({ isLoading: false, passwordFormError: response.response.reason });
        return;
      }

      dispatch({ isLoading: false, passwordFormError: null });

      router.go("/settings");

    } catch (error) {
      dispatch({ isLoading: false});
      console.log(error)
    }
  }


}

export default new UserController()
