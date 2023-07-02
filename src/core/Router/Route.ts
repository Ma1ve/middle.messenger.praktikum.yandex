import Block, { BlockClass } from "../Block";
import renderDOM from "../renderDom";


function isEqual(lhs: string, rhs: string) {
    return lhs === rhs;
}

export interface IRouterProps {
    rootQuery: string;
    exact: boolean;
}
export default class Route {
    private _pathname: string;
    private _blockClass: BlockClass<any>;
    private _block: Block;
    private _props: IRouterProps;
    private _componentProps: any;
    // @ts-ignore
    private _params: {};
    private _needAuth: boolean;
    private _onUnautorized: any;
    private _redirect: () => void;

    constructor(
        pathname: string,
        view: BlockClass<any>,
        props: IRouterProps,
        componentProps: any,
        needAuth: boolean,
        onUnautorized: boolean,
        redirect: () => void,
    ) {
        this._pathname = pathname;

        this._blockClass = view;
        this._props = props;
        this._needAuth = needAuth;
        this._onUnautorized = onUnautorized;
        this._componentProps = componentProps;
        this._params = this.getParams();
        this._redirect = redirect
    }

    getParams(): {} {
        return Object.fromEntries((new URLSearchParams(document.location.search)).entries());
    }

    leave() {
        this._block?.destroy();
    }

    match(pathname: string) {
        if (this._props.exact) {
            return isEqual(pathname, this._pathname);
        } else {
            return ~pathname.indexOf(this._pathname);
        }

    }

    checkAuth() {
        if (this._needAuth) {
            if (typeof this._onUnautorized === "function") {
                return this._onUnautorized(this._pathname);
            }
        }
        return true;
    }

    render() {
        if (this.checkAuth()) {
            this._block = new this._blockClass({...this._componentProps, routerParams: this.getParams()});
            renderDOM(this._block, this._props.rootQuery);
        } else {
            this._redirect()
        }
    }
}
