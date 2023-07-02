import { Store } from "./core/Store/store";
import { AppState, defaultState } from "./core/Store/store.types";
import { HashRouter } from "./core/HashRouter";
import { initApp } from "./services/initApp";
import { initRouter } from "./router";

import './index.html'
import './assets/scss/index.scss'

declare global {
  interface Window {
    store: Store<AppState>;
    router: HashRouter
  }
}


window.addEventListener("DOMContentLoaded", () => {
  const store = new Store<AppState>(defaultState);

  window.store = store;

   store.on("changed", (prevState, nextState) => {
      if(!prevState.appIsInited && nextState.appIsInited) {
        initRouter(store);
      }
      // console.log(
      //   "%cstore updated",
      //   "background: #222; color: #bada55",
      //   nextState,
      // );
  });

  store.dispatch(initApp);

})


