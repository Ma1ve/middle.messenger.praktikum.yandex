import BaseAPI from "./BaseApi";

export interface SignInData {
  login: string,
  password: string
}
export interface SignUpData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

class AuthApi extends BaseAPI {

  constructor() {
    super('/auth');
  }

  public signIn(data: SignInData): Promise<XMLHttpRequest> {
    return this.http.post('/signin', {data});
  }

  public signUp(data: SignUpData) {
    return this.http.post('/signup', {data});
  }

  public getUser() {
    return this.http.get('/user')
  }

  public logout(): Promise<XMLHttpRequest> {
    return this.http.post('/logout');
  }
}

export default new AuthApi()
