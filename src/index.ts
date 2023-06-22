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
import { initRouter } from "./router";
import { initApp } from "./services/initApp";


// window.addEventListener("DOMContentLoaded", () => {
//   const page404 = new Page404();
//   const page500 = new Page500();
//   const login = new Login();
//   const registration = new Registration();
//   const chatEmpty = new ChatEmpty();
//   const chat = new Chat();
//   const profile = new Profile();
//   const profileData = new ProfileData();
//   const profilePassword = new ProfilePassword();

//   switch (window.location.pathname) {
//     case "/login": {
//       renderDom("#app", login);
//       break;
//     }
//     case "/registration": {
//       renderDom("#app", registration);
//       break;
//     }
//     case "/chat": {
//       renderDom("#app", chatEmpty);
//       break;
//     }
//     case "/chat/message": {
//       renderDom("#app", chat);
//       break;
//     }
//     case "/profile": {
//       renderDom("#app", profile);
//       break;
//     }
//     case "/profile/data": {
//       renderDom("#app", profileData);
//       break;
//     }
//     case "/profile/password": {
//       renderDom("#app", profilePassword);
//       break;
//     }
//     case "/page404": {
//       renderDom("#app", page404);
//       break;
//     }
//     case "/page500": {
//       renderDom("#app", page500);
//       break;
//     }

//     default: {
//       renderDom("#app", login);
//     }
//   }
// });






declare global {
  interface Window {
    store: Store<AppState>;
    router: HashRouter
  }
}


window.addEventListener("DOMContentLoaded", () => {
  const store = new Store<AppState>(defaultState);
  const router = new HashRouter();

  window.router = router;
  window.store = store;


  store.on('changed', (prevState, nextState) => {
    console.log(
        '%cstore updated',
        'background: #222; color: #bada55',
        nextState,)
  })

  initRouter(router, store)

  store.dispatch(initApp);





})

 //! Modal
  const modalProfile = document.querySelector('.block-overflow');
  const avatar = document.querySelector('.rofile__info-avatar-circle');


  console.log(document.querySelector('.profile__info-avatar'))
  // avatar?.addEventListener('click', () => {
  //     modalProfile?.style.display = 'block'
  // })
