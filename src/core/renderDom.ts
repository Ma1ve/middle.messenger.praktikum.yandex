// import Block from "./Block.js";

// export default function renderDom(block: Block) {
//   const root = document.querySelector("#app");

//   root!.innerHTML = "";
//   root!.appendChild(block.getContent());
// }

export function render(query, block) {
  const root = document.querySelector(query);

  // Можно завязаться на реализации вашего класса Block
  root.appendChild(block.getContent());

  console.log(13);

  root.innerHTML = "131";

  // block.dispatchComponentDidMount();

  return root;
}
