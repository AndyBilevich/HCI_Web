import { Api } from './api.js';

export { HomeRoomApi };

class HomeRoomApi {
  static get url() {
    return `${Api.baseUrl}/rooms`;
  }

  static add(room, controller) {
   return Api.post(HomeRoomApi.url, room, controller);
  }

  static modify(room, controller) {
    return Api.put(`${HomeRoomApi.url}/${room.id}`, room, controller);
  }

  static delete(id, controller) {
    return Api.delete(`${HomeRoomApi.url}/${id}`, controller);
  }

  static get(id, controller) {
    return Api.get(`${HomeRoomApi.url}/${id}`, controller);
  }

  static getAll(controller) {
    return Api.get(HomeRoomApi.url, controller);
  }
}
