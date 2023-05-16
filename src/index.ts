// import renderDom from "./core/renderDom";

// document.addEventListener("DOMContentLoaded", () => {
//   // renderDom();
// });

import Button from "./components/button/Button";
import { render } from "./core/renderDOM";

const button = new Button({
  className: "my-class",
  child: "Click me",
});

// app — это class дива в корне DOM
render("#app", button);

console.log(123);

// Через секунду контент изменится сам, достаточно обновить пропсы
// setTimeout(() => {
//   button.setProps({
//     className: "otherClass",
//     child: "Click me, please",
//   });
// }, 1000);
