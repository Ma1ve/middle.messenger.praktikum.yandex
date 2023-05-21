import Block from "./Block";

export function renderDom(rootSelector: string, block: Block) {
  const root = document.querySelector(rootSelector);

  root!.innerHTML = "";
  root!.append(block.getContent()!);
}
