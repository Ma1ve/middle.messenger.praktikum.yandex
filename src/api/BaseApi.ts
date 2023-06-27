import HTTPTransport from "../core/htttpTransport";
export default class BaseAPI {

  protected http: HTTPTransport;

  constructor(endpoint: string) {
    this.http = new HTTPTransport(endpoint)
  }

  create() { throw new Error("Not implemented"); }

  request() { throw new Error("Not implemented"); }

  update() { throw new Error("Not implemented"); }

  delete() { throw new Error("Not implemented"); }
}
