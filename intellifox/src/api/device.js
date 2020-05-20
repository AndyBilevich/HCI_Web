import { Api } from './api.js';

export { DeviceApi, Device };

class DeviceApi {
  static get url() {
    return `${Api.baseUrl}/rooms`;
  }

  static add(room, controller) {
   return Api.post(DeviceApi.url, room, controller);
  }

  static modify(room, controller) {
    return Api.put(`${DeviceApi.url}/${room.id}`, room, controller);
  }

  static delete(id, controller) {
    return Api.delete(`${DeviceApi.url}/${id}`, controller);
  }

  static get(id, controller) {
    return Api.get(`${DeviceApi.url}/${id}`, controller);
  }

  static getAll(controller) {
    return Api.get(DeviceApi.url, controller);
  }
}

class Device {
  constructor(id, name, meta) {
    if (id) {
      this.id = id;
    }
    this.name = name;
    this.meta = meta;
  }
}
