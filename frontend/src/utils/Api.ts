import { User } from "../components/Chat";

export interface MessageOwner {
  _id: string;
}

export interface MessageData {
  name: string;
  text: string;
  owner: MessageOwner;
  _id: string;
}

interface ApiOptions {
  jwt?: string | null;
  url?: string;
  headers?: Record<string, string>;
}

class Api {
  private _jwt: string;
  private _url: string;
  private _headers: Record<string, string>;
  constructor(options: ApiOptions) {
    this._jwt = options.jwt || "";
    this._url = options.url || "";
    this._headers = options.headers || {};
  }

  private _checkStatus<T>(res: Response) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }

  private _request<T>(url: string, options: RequestInit) {
    return fetch(url, options).then((res) => this._checkStatus<T>(res));
  }

  updateAuthorization(jwt: string) {
    this._jwt = jwt;
    this._headers.authorization = jwt;
  }

  getMessages(selectedUser: string) {
    return this._request(`${this._url}/messages`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        selectedUser,
      }),
    });
  }

  createNewMessage(text: string, selectedUser: string) {
    return this._request(`${this._url}/messages/send`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        text,
        recipient: selectedUser,
      }),
    });
  }

  getProfileInfo() {
    return this._request(`${this._url}/users/me`, {
      headers: this._headers,
    });
  }

  getUsers() {
    return this._request(`${this._url}/users`, {
      headers: this._headers,
    });
  }
}

const apiOptions: ApiOptions = {
  jwt: localStorage.getItem("jwt"),
  url: "http://localhost:3001",
  headers: {
    authorization: localStorage.getItem("jwt") || "",
    "Content-Type": "application/json",
  },
};

const api = new Api(apiOptions);

export { api };
