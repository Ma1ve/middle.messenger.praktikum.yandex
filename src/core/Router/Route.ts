import Block from "../Block";
import { renderDom } from "../renderDom";

// function isEqual(lhs: string, rhs: string): boolean {
//   return lhs === rhs
// }


class Route {
  private _pathname: string;
  private _blockClass: typeof Block;
  private _block: Block | null;
  private _props: any;

  constructor(pathname: string, view: typeof Block, props: any) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  public navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render()
    }

  }

  public leave() {
      if (this._block) {
        this._block.hide();
      }
  }

  public match(pathname: string): boolean {
    // return isEqual(pathname, this._pathname);
    return pathname === this._pathname;
  }

  public render() {
    if (!this._block) {
      this._block = new this._blockClass();

      renderDom(this._props.rootQuery, this._block);
      return;
    }

    this._block.show();

  }

}

export default Route;
