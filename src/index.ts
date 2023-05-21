import Page404 from "./pages/Page404";
import Page500 from "./pages/Page500";
import Login from "./pages/Login";

import { renderDom } from "./core/renderDom";
import { Input } from "./components/Input/input";

window.addEventListener("DOMContentLoaded", () => {
  const page404 = new Page404();

  const page500 = new Page500();

  const login = new Login();

  renderDom("#app", page404);
});
