import { Api } from './api.js';

export { RoomApi, Room };

class RoomApi {
  static get url() {
    return `${Api.baseUrl}/rooms`;
  }

  static add(room, controller) {
    return Api.post(RoomApi.url, room, controller);
  }

  static modify(room, controller) {
    return Api.put(`${RoomApi.url}/${room.id}`, room, controller);
  }

  static delete(id, controller) {
    return Api.delete(`${RoomApi.url}/${id}`, controller);
  }

  static get(id, controller) {
    return Api.get(`${RoomApi.url}/${id}`, controller);
  }

  static getAll(controller) {
    return Api.get(RoomApi.url, controller);
  }
}

class Room {
  constructor(id, name, meta) {
    if (id) {
      this.id = id;
    }
    this.name = name;
    this.meta = meta;
  }
}
