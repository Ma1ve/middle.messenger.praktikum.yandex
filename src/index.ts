import Page404 from "./pages/Page404";
import Page500 from "./pages/Page500";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import ProfileData from "./pages/ProfileData";
import ProfilePassword from "./pages/ProfilePassword";
import ChatEmpty from "./pages/ChatEmpty";

import { renderDom } from "./core/renderDom";

window.addEventListener("DOMContentLoaded", () => {
  const page404 = new Page404();
  const page500 = new Page500();
  const login = new Login();
  const registration = new Registration();
  const chatEmpty = new ChatEmpty();
  const chat = new Chat();
  const profile = new Profile();
  const profileData = new ProfileData();
  const profilePassword = new ProfilePassword();

  switch (window.location.pathname) {
    case "/login": {
      renderDom("#app", login);
      break;
    }
    case "/registration": {
      renderDom("#app", registration);
      break;
    }
    case "/chat": {
      renderDom("#app", chatEmpty);
      break;
    }
    case "/chat/message": {
      renderDom("#app", chat);
      break;
    }
    case "/profile": {
      renderDom("#app", profile);
      break;
    }
    case "/profile/data": {
      renderDom("#app", profileData);
      break;
    }
    case "/profile/password": {
      renderDom("#app", profilePassword);
      break;
    }
    case "/page404": {
      renderDom("#app", page404);
      break;
    }
    case "/page500": {
      renderDom("#app", page500);
      break;
    }

    default: {
      renderDom("#app", login);
    }
  }
});
