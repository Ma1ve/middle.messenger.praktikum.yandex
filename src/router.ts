
import { HashRouter } from "./core/HashRouter";
import { Store } from "./core/Store/store";
import { AppState } from "./core/Store/store.types";
import { Screens, getScreenComponent } from "./utils/screenList";


import renderDOM from "./core/renderDom";

// const routes = [
//   {
//     path: '#login',
//     block: Screens.Login,
//     shouldAuthorized: false,
//   },
//   {
//     path: '#registration',
//     block: Screens.Registration,
//     shouldAuthorized: false,
//   },
//   {
//     path: '#chat',
//     block: Screens.Chat,
//     shouldAuthorized: true,
//   },
//   {
//     path: '#profile',
//     block: Screens.Profile,
//     shouldAuthorized: false,
//   },
//   {
//     path: '#profile-data',
//     block: Screens.ProfileData,
//     shouldAuthorized: true,
//   },
//   {
//     path: '#profile-password',
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


const routes = [
  {
    path: '#login',
    block: Screens.Login,
    shouldAuthorized: false,
  },
  {
    path: '#sign-up',
    block: Screens.Registration,
    shouldAuthorized: false,
  },
  {
    path: '#messenger',
    block: Screens.Chat,
    shouldAuthorized: true,
  },
  {
    path: '#settings',
    block: Screens.Profile,
    shouldAuthorized: false,
  },
  {
    path: '#settings/data',
    block: Screens.ProfileData,
    shouldAuthorized: true,
  },
  {
    path: '#settings/password',
    block: Screens.ProfilePassword,
    shouldAuthorized: true,
  },
   {
    path: '#page404',
    block: Screens.Page404,
    shouldAuthorized: true,
  },
   {
    path: '#page500',
    block: Screens.Page500,
    shouldAuthorized: false,
  },
  {
    path: '*',
    block: Screens.Login,
    shouldAuthorized: false,
  },
]



export function initRouter(router: HashRouter, store: Store<AppState>) {

  routes.forEach(route => {

    router.use(route.path, () => {

      const isAuthorizate = Boolean(store.getState().user);
      const currentScreen = Boolean(store.getState().screen);

      if (isAuthorizate || !route.shouldAuthorized) {
        store.dispatch({screen: route.block});
        return;
      }

      if (!currentScreen) {
        console.log("Go to chat because !currentScreen")
        store.dispatch({screen: Screens.Login});
      }

    })
  })

    /**
   * Глобальный слушатель изменений в сторе
   * для переключения активного экрана
   */
  store.on('changed', (prevState, nextState) => {
    if (!prevState.appIsInited && nextState.appIsInited) {
      router.start()
    }

     if (prevState.screen !== nextState.screen) {
      const Page = getScreenComponent(nextState.screen)
      renderDOM(new Page({}))
    }


  })



}
