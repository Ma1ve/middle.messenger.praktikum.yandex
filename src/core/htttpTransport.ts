enum METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}


export const BASE_URL = "https://ya-praktikum.tech/api/v2";

interface Options {
  method?: METHODS;
  data?: any;
  timeout?: number;
  headers?: { [header: string]: string };
}

type HttpMethod = (url: string, options?: Options) => Promise<XMLHttpRequest>;

function queryStringify(data: Record<string, any>) {

  if (data instanceof FormData) {
    return data;
  }

  if (typeof data !== "object") {
    throw new Error("Data must be object");
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? "&" : ""}`;
  }, "?");
}

class HTTPTransport {
  static BASE_URL = BASE_URL

  protected url: string;

  constructor(endpoint: string) {
    this.url = `${HTTPTransport.BASE_URL}${endpoint}`;
  }

  public getCurrentUrl(path: string): string {
    if (!path) {
      return this.url
    }

    return `${this.url}${path}`;
  }

  public get: HttpMethod = (url, options = {}) => {
    return this.request( this.getCurrentUrl(url), { ...options, method: METHODS.GET }, options.timeout );
  };

  public post: HttpMethod = (url, options = {}) => {
    return this.request( this.getCurrentUrl(url), { ...options, method: METHODS.POST }, options.timeout );
  };

  public put: HttpMethod = (url, options = {}) => {
    return this.request( this.getCurrentUrl(url), { ...options, method: METHODS.PUT }, options.timeout );
  };

  public delete: HttpMethod = (url, options = {}) => {
    return this.request( this.getCurrentUrl(url), { ...options, method: METHODS.DELETE }, options.timeout );
  };

  private request = (
  url: string,
  options: Options,
  timeout = 5000
): Promise<XMLHttpRequest> => {
  const { headers = {}, method, data } = options;

  return new Promise((resolve, reject) => {
    if (!method) {
      reject("No method");
      return;
    }

    const xhr = new XMLHttpRequest();

    const isGet = method === METHODS.GET;

    xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

    Object.keys(headers).forEach((key) => {
      xhr.setRequestHeader(key, headers[key]);
    });

    xhr.onload = function () {
      resolve(xhr);
    };


    xhr.onabort = reject;
    xhr.onerror = reject;
    xhr.ontimeout = reject;
    xhr.timeout = timeout;

    xhr.withCredentials = true;

    if (data instanceof FormData) {
      xhr.send(data);
    } else {

      xhr.withCredentials = true;
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.responseType = "json";

      // xhr.responseType = isGet || !data ? "json" : "text";

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }

    }

  });
};
}

export default HTTPTransport;


