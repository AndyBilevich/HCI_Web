import { Api } from './api.js';

export { HomeRoomApi };

class HomeRoomApi {
  static get url() {
    return `${Api.baseUrl}/homes`;
  }

  static get(homeId, controller) {
   return Api.get(`${HomeRoomApi.url}/${homeId}/rooms`, {homeId}, controller);
  }

  static add(homeId, roomId, controller) {
    return Api.post(`${HomeRoomApi.url}/${homeId}/rooms/${roomId}`, {homeId, roomId}, controller);
  }

  static delete(roomId, controller) {
    return Api.delete(`${HomeRoomApi.url}/rooms/${roomId}`, {roomId}, controller);
  }
}
