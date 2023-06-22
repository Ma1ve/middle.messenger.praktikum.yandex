// export type APIError = {
//   reason: string;
// };

// //! API Auth
// export interface SignUpApi {
//   first_name: string,
//   second_name: string,
//   login: string,
//   email: string,
//   password: string,
//   phone: string
// }
// export interface SignInApi {
//   login: string,
//   password: string
// }



export type UserDTO = {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  avatar: string;
  phone: string;
  email: string;
};

//! API Chats

//! API User
