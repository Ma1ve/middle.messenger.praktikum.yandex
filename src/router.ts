
import { HashRouter } from "./core/HashRouter";
import { Store } from "./core/Store/store";
import { AppState } from "./core/Store/store.types";
import { Screens, getScreenComponent } from "./utils/screenList";


import renderDOM from "./core/renderDom";

import PathRouter from "./core/Router/PathRouter";

import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import ProfileData from "./pages/ProfileData";
import ProfilePassword from "./pages/ProfilePassword";




// const routes = [
//   {
//     path: '#login',
//     block: Screens.Login,
//     shouldAuthorized: false,
//   },
//   {
//     path: '#sign-up',
//     block: Screens.Registration,
//     shouldAuthorized: false,
//   },
//   {
//     path: '#messenger',
//     block: Screens.Chat,
//     shouldAuthorized: true,
//   },
//   {
//     path: '#settings',
//     block: Screens.Profile,
//     shouldAuthorized: false,
//   },
//   {
//     path: '#settings/data',
//     block: Screens.ProfileData,
//     shouldAuthorized: true,
//   },
//   {
//     path: '#settings/password',
//     block: Screens.ProfilePassword,
//     shouldAuthorized: true,
//   },
//    {
//     path: '#page404',
//     block: Screens.Page404,
//     shouldAuthorized: true,
//   },
//    {
//     path: '#page500',
//     block: Screens.Page500,
//     shouldAuthorized: false,
//   },
//   {
//     path: '*',
//     block: Screens.Login,
//     shouldAuthorized: false,
//   },
// ]



// export function initRouter(router: HashRouter, store: Store<AppState>) {

//   routes.forEach(route => {

//     router.use(route.path, () => {

//       const isAuthorizate = Boolean(store.getState().user);
//       const currentScreen = Boolean(store.getState().screen);

//       if (isAuthorizate || !route.shouldAuthorized) {
//         store.dispatch({screen: route.block});
//         return;
//       }

//       if (!currentScreen) {
//         console.log("Go to chat because !currentScreen")
//         store.dispatch({screen: Screens.Login});
//       }

//     })
//   })

//   store.on('changed', (prevState, nextState) => {
//     if (!prevState.appIsInited && nextState.appIsInited) {
//       router.start()
//     }

//      if (prevState.screen !== nextState.screen) {
//       const Page = getScreenComponent(nextState.screen)
//       renderDOM(new Page({}))
//     }


//   })



// }

//! TEST

export const router = new PathRouter('#app')

export function initRouter(store) {
  router
    .use({
      pathname: '/',
      block: Login,
    })
    .use({
      pathname: '/sign-up',
      block: Registration,
    })
    .use({
      pathname: '/messenger',
      block: Chat,
      needAuth: true,
      redirectPath: '/',
      onUnautorized: () => Boolean(store.getState().user),
    })
     .use({
      pathname: '/settings',
      block: Profile,
      needAuth: true,
      redirectPath: '/',
      onUnautorized: () => Boolean(store.getState().user),
    })
     .use({
      pathname: '/settings/data',
      block: ProfileData,
      needAuth: true,
      redirectPath: '/',
      onUnautorized: () => Boolean(store.getState().user),
    })
    .use({
      pathname: '/settings/password',
      block: ProfilePassword,
      needAuth: true,
      redirectPath: '/',
      onUnautorized: () => Boolean(store.getState().user),
    })
    .start();
}

