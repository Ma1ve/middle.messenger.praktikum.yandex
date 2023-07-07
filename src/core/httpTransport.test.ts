import sinon, {
  SinonFakeXMLHttpRequest,
  SinonFakeXMLHttpRequestStatic,
} from "sinon";
import HTTPTransport from "./htttpTransport";

import { expect } from "chai";

describe("HTTPTransport", () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let http: HTTPTransport;
  const requests: SinonFakeXMLHttpRequest[] = [];


  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();

    // @ts-ignore
    global.XMLHttpRequest = xhr;

    xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    };

    http = new HTTPTransport("");

  });

  afterEach(() => {
    requests.length = 0;
    sinon.restore()
  });


  describe("get()", () => {

    it("Метод должен отправить GET запрос", () => {

      http.get("/auth/user");

      const [request] = requests;

      expect(request.method).to.eq("GET");

    });

  });

  describe("post()", () => {

    it("Метод должен отправить POST запрос", () => {

      http.post("/auth/signin");

      const [request] = requests;

      expect(request.method).to.eq("POST");

    });

  });

   describe("put()", () => {

    it("Метод должен отправить PUT запрос", () => {

      http.put("/user/password");

      const [request] = requests;

      expect(request.method).to.eq("PUT");

    });

  });

  describe("delete()", () => {

    it("Метод должен отправить DELETE запрос", () => {

      http.delete("/chats");

      const [request] = requests;

      expect(request.method).to.eq("DELETE");

    });

  });



});








