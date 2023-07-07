import Sinon from "sinon";
import Block from "../Block"
import PathRouter, { TRouteConstructor } from "./PathRouter";
import { expect } from "chai";

describe("Router", () => {
  let BlockMock: Block;
  //@ts-ignore
  const getContentFake = Sinon.stub();
  let router: PathRouter;

  beforeEach(() => {
    getContentFake.returns(document.createElement("div"));
    BlockMock = class {
        //@ts-ignore
        getContent = getContentFake
    } as unknown as Block

    router = new PathRouter("#app");

    getContentFake.resetHistory();
  })

  afterEach(() => {

    Sinon.restore()
  })


  it("Метод use должен вернуть инстанс роутера", () => {
    const params: TRouteConstructor = {
        //@ts-ignore
        block: BlockMock,
        exact: true,
        needAuth: true,
        onUnautorized: () => true,
        pathname: "/",
        props: {},
        redirectPath: "/"
    }
      const result = router.use(params);

      expect(result).to.eq(router);
  });

  it("Должен отрисовать страницу после запуска роутера", () => {
        const params: TRouteConstructor = {
            //@ts-ignore
            block: BlockMock,
            exact: true,
            needAuth: true,
            onUnautorized: () => true,
            pathname: "/",
            props: {},
            redirectPath: "/"
        }

        router.use(params).start();

        expect(getContentFake.callCount).to.eql(1)
    });

  describe("back()", () => {
    it("Должен отрисовать предыдушию страницу", () => {

       const params: TRouteConstructor = {
        //@ts-ignore
        block: BlockMock,
        exact: true,
        needAuth: true,
        onUnautorized: () => true,
        pathname: "/",
        props: {},
        redirectPath: "/"
      }

      router.use(params).start();

      router.back();

      expect(getContentFake.callCount).to.eql(1);
    })
  })

  describe("forward()", () => {
    it("Должен перемещаться на одну страницу вперед", () => {
        const params: TRouteConstructor = {
        //@ts-ignore
        block: BlockMock,
        exact: true,
        needAuth: true,
        onUnautorized: () => true,
        pathname: "/",
        props: {},
        redirectPath: "/"
      }

       router.use(params).start();

       router.forward();

       expect(getContentFake.callCount).to.eql(1);

    })
  })

  describe("go()", () => {
    it("Должен перейти на указанный путь и вызвать соответствующий роут", () => {
        const params: TRouteConstructor = {
        //@ts-ignore
        block: BlockMock,
        exact: true,
        needAuth: false,
        onUnautorized: () => false,
        pathname: "/sign-up",
        props: {},
        redirectPath: "/"
      }

      router.use(params).start();

      router.go("/sign-up");

      expect(getContentFake.callCount).to.eq(1);
      expect(router.getRoute("/sign-up")).to.exist;
    })
  })


})
