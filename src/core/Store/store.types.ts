
export type User = {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  avatar: string;
  phone: string;
  email: string;
};

export interface IChat {
  id: number;
  title: string;
  avatar: null
  created_by: number;
  unread_count: number;
  last_message: {
    content: string;
    id: number;
    time: string;
    user: User;
  };

  display_name: string;
  time: string;
}

export interface AppState {
  loginFormError?: string | null;
  registrationFormError?: string | null;
  profileFormError?: string | null;
  passwordFormError?: string | null;
  avatarFormError?: string | null;
  modalFormError?: string | null;
  ActiveMessages?: any;
  currentChat?: IChat
  user: User | null;
  chats?: any | null
  chatId?: string;
}


export const defaultState: AppState = {
    loginFormError: null,
    user: null,
};


