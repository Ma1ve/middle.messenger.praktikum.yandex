import { BlockClass } from "../core/Block";
import { HashRouter } from "../core/HashRouter";
import { router } from "../router";

type WithRouterProps = { router: HashRouter };

export function withRouter<P extends WithRouterProps>(WrapperBlock: BlockClass<P>) {
   // @ts-expect-error No base constructor has the specified number of type arguments
   return class extends WrapperBlock<P>{
    public static componentName = WrapperBlock.componentName || WrapperBlock.name

    constructor(props: P) {
      super({...props, router: router})
    }
   } as BlockClass<Omit<P, 'router'>>
}
