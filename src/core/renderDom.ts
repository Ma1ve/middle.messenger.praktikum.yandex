import Block from "./Block";

// export function renderDom(rootSelector: string, block: Block) {
//   const root = document.querySelector(rootSelector);

//   if (root === null) {
//     throw new Error(`root not found by selector "${rootSelector}"`);
//   }

//   root.innerHTML = "";
//   root!.append(block.getContent()!);

//   return root

// }

export default function renderDOM(block: Block, selector: string = "#app") {
  const root = document.querySelector(selector);

  root!.innerHTML = "";
  root!.appendChild(block.getContent()!);
}
