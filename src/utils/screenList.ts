import Block from "../core/Block";

import Login from "../pages/Login";
import Registration  from "../pages/Registration";
import Chat  from "../pages/Chat";
import Profile from "../pages/Profile";
import ProfileData from "../pages/ProfileData";
import ProfilePassword from "../pages/ProfilePassword";
import Page500  from "../pages/Page500";
import Page404 from "../pages/Page404";


export enum Screens {
  Login = 'login',
  Registration = 'registration',
  Chat = 'chat',
  Profile = 'profile',
  ProfileData = 'profileData',
  ProfilePassword = 'profilePassword',
  Page404 = 'page404',
  Page500 = 'page500',

}

const map: Record<Screens, any> = {
  [Screens.Login]: Login,
  [Screens.Registration]: Registration,
  [Screens.Chat]: Chat,
  [Screens.Profile]: Profile,
  [Screens.ProfileData]: ProfileData,
  [Screens.ProfilePassword]: ProfilePassword,
  [Screens.Page404]: Page404,
  [Screens.Page500]: Page500,
}

export const getScreenComponent = (screen: Screens): Block<any> => {
  return map[screen]
}
