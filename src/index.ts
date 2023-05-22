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
      return renderDom("#app", login);
    }
    case "/registration": {
      return renderDom("#app", registration);
    }
    case "/chat": {
      return renderDom("#app", chatEmpty);
    }
    case "/chat/message": {
      return renderDom("#app", chat);
    }
    case "/profile": {
      return renderDom("#app", profile);
    }
    case "/profile/data": {
      return renderDom("#app", profileData);
    }
    case "/profile/password": {
      return renderDom("#app", profilePassword);
    }
    case "/page404": {
      return renderDom("#app", page404);
    }
    case "/page500": {
      return renderDom("#app", page500);
    }

    default: {
      renderDom("#app", login);
    }
  }
});
