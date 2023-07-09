import PathRouter from "./core/Router/PathRouter";

import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import ProfileData from "./pages/ProfileData";
import ProfilePassword from "./pages/ProfilePassword";

import { Store } from "./core/Store/store";
import { AppState } from "./core/Store/store.types";


export const router = new PathRouter("#app")

export function initRouter(store: Store<AppState>) {
  router
    .use({
      pathname: "/",
      block: Login,
      needAuth: false,
      redirectPath: "/",
      onUnautorized: () => Boolean(store.getState().user),
    })
    .use({
      pathname: "/sign-up",
      block: Registration,
      needAuth: false,
      redirectPath: "/",
      onUnautorized:() => Boolean(store.getState().user),

    })
    .use({
      pathname: "/messenger",
      block: Chat,
      needAuth: true,
      redirectPath: "/",
      onUnautorized: () => Boolean(store.getState().user),


    })
     .use({
      pathname: "/settings",
      block: Profile,
      needAuth: true,
      redirectPath: "/",
      onUnautorized: () => Boolean(store.getState().user),

    })
     .use({
      pathname: "/settings-data",
      block: ProfileData,
      needAuth: true,
      redirectPath: "/",
      onUnautorized: () => Boolean(store.getState().user),
    })
    .use({
      pathname: "/settings-password",
      block: ProfilePassword,
      needAuth: true,
      redirectPath: "/",
      onUnautorized: () => Boolean(store.getState().user),
    })
    .start();
}

