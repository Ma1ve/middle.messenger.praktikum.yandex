import Page404 from "./pages/Page404/indexX";
import Page500 from "./pages/Page500/indexX";
import Login from "./pages/Login/indexX";
import Registration from "./pages/Registration/indexX";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile/indexX";
import ProfileData from "./pages/ProfileData/indexX";
import ProfilePassword from "./pages/ProfilePassword/indexX";
import ChatEmpty from "./pages/ChatEmpty";

import { renderDom } from "./core/renderDom";

import { Store } from "./core/Store/store";
import { AppState, defaultState } from "./core/Store/store.types";
import { HashRouter } from "./core/HashRouter";
import { initApp } from "./services/initApp";
import { initRouter } from "./router";


declare global {
  interface Window {
    store: Store<AppState>;
    router: HashRouter
  }
}


window.addEventListener("DOMContentLoaded", () => {
  const store = new Store<AppState>(defaultState);
  // const router = new HashRouter();

  // window.router = router;
  window.store = store;


  // store.on('changed', (prevState, nextState) => {
  //   console.log(
  //       '%cstore updated',
  //       'background: #222; color: #bada55',
  //       nextState,)
  // })


   store.on('changed', (prevState, nextState) => {
      if(!prevState.appIsInited && nextState.appIsInited) {
        initRouter(store);
      }
      console.log(
        '%cstore updated',
        'background: #222; color: #bada55',
        nextState,
      );
  });

  // initRouter(router, store)

  store.dispatch(initApp);

})


