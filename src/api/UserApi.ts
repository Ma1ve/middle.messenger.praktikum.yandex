import BaseAPI from "./BaseApi";

export interface UpdateUserData {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface UpdatePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string
}

export interface UserDataSearch {
  loginUser: string, chatId: number
}

class UserApi extends BaseAPI {
  constructor() {
    super("/user");
  }

  updateUser(data: UpdateUserData) {
    return this.http.put("/profile", {data} );
  }

  updateAvatar(data: FormData) {
    return this.http.put("/profile/avatar", {data} );
  }

  updatePassword(data: UpdatePassword) {
    return this.http.put("/password", {data} );
  }

  searchUser(login: string) {
    return this.http.post("/search", {data: { login }} );
  }

}

export default new UserApi();
