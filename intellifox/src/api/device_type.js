import { Api } from './api.js';

export { DeviceTypeApi, DeviceType };

class DeviceTypeApi {
  static get url() {
    return `${Api.baseUrl}/rooms`;
  }

  static add(room, controller) {
   return Api.post(DeviceTypeApi.url, room, controller);
  }

  static modify(room, controller) {
    return Api.put(`${DeviceTypeApi.url}/${room.id}`, room, controller);
  }

  static delete(id, controller) {
    return Api.delete(`${DeviceTypeApi.url}/${id}`, controller);
  }

  static get(id, controller) {
    return Api.get(`${DeviceTypeApi.url}/${id}`, controller);
  }

  static getAll(controller) {
    return Api.get(DeviceTypeApi.url, controller);
  }
}

class DeviceType {
  constructor(id, name, meta) {
    if (id) {
      this.id = id;
    }
    this.name = name;
    this.meta = meta;
  }
}
