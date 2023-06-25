import Block from "../../core/Block";


import template from "./loading.hbs";

import "./loading.scss";

interface LoadingProps {}

export class Loading extends Block {
  constructor(props: LoadingProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default Loading;
