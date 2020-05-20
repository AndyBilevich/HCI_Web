import { Api } from './api.js';

export { RoomDeviceApi };

class RoomDeviceApi {
  static get url() {
    return `${Api.baseUrl}/rooms`;
  }

  static add(room, controller) {
   return Api.post(RoomDeviceApi.url, room, controller);
  }

  static modify(room, controller) {
    return Api.put(`${RoomDeviceApi.url}/${room.id}`, room, controller);
  }

  static delete(id, controller) {
    return Api.delete(`${RoomDeviceApi.url}/${id}`, controller);
  }

  static get(id, controller) {
    return Api.get(`${RoomDeviceApi.url}/${id}`, controller);
  }

  static getAll(controller) {
    return Api.get(RoomDeviceApi.url, controller);
  }
}
