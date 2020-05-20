import { Api } from './api.js';

export { HomeApi, Home };

class HomeApi {
  static get url() {
    return `${Api.baseUrl}/rooms`;
  }

  static add(room, controller) {
   return Api.post(HomeApi.url, room, controller);
  }

  static modify(room, controller) {
    return Api.put(`${HomeApi.url}/${room.id}`, room, controller);
  }

  static delete(id, controller) {
    return Api.delete(`${HomeApi.url}/${id}`, controller);
  }

  static get(id, controller) {
    return Api.get(`${HomeApi.url}/${id}`, controller);
  }

  static getAll(controller) {
    return Api.get(HomeApi.url, controller);
  }
}

class Home {
  constructor(id, name, meta) {
    if (id) {
      this.id = id;
    }
    this.name = name;
    this.meta = meta;
  }
}
