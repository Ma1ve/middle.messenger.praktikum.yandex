import BaseAPI from "./BaseApi";


export interface ChatUserData {
  users: number[];
  chatId: number;
}

class ChatApi extends BaseAPI {
  constructor() {
    super("/chats");
  }

  createChat(title: string) {
    return this.http.post("", {data: { title }} );
  }

  deleteChat(id: number) {
    return this.http.delete("", { data: { chatId: id } });
  }

  getChatInfo() {
    return this.http.get("");
  }

  getUsers(id: number) {
    return this.http.get(`/${id}/users`);
  }

  addUsers(addUserData: ChatUserData) {
    return this.http.put("/users", { data: addUserData });
  }

  deleteUsers(deleteUserData: ChatUserData) {
    return this.http.delete("/users", { data: deleteUserData });
  }

  getToken(id: number){
    return this.http.post(`/token/${id}`);
  }

  changeAvatar(data: FormData) {
    return this.http.put("/avatar", {data} );
  }

}

export default new ChatApi();
