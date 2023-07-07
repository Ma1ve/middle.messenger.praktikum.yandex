import Link from "./index";

import sinon from "sinon";
import { expect } from "chai";

describe("Link component", () => {
  const callback = sinon.stub();
  const label = "Link";
  const href = "/login";

  beforeEach(() => {
    callback.reset();
  });

  it("Компонент должен рендериться", () => {
    new Link({ href, label });
  });

  it("Должен вызываться обработчик события при клике", () => {
    const clickHandler = sinon.stub();
    const link = new Link({
      href,
      label,
      events: {
        click: clickHandler,
      },
    });

    link.element?.click();

    expect(clickHandler.calledOnce).to.eq(true);
  });

   it("Должен вызываться обработчик события с объектом события при клике", () => {
    const clickHandler = sinon.stub();
    const link = new Link({
      href,
      label,
      events: {
        click: clickHandler,
      },
    });

    const clickEvent = new window.MouseEvent("click");
    link.element?.dispatchEvent(clickEvent);

    expect(clickHandler.calledOnce).to.eq(true);
    expect(clickHandler.firstCall.args[0]).to.be.instanceOf(window.MouseEvent);
  });
});



