import { Api } from './api.js';

export { RoomDeviceApi };

class RoomDeviceApi {
  static get url() {
    return `${Api.baseUrl}/rooms`;
  }

  static get(roomId, controller) {
   return Api.get(`${RoomDeviceApi.url}/${roomId}/devices`, {roomId}, controller);
  }

  static add(roomId, deviceId, controller) {
    return Api.post(`${RoomDeviceApi.url}/${roomId}/devices/${deviceId}`, {roomId, deviceId}, controller);
  }

  static delete(deviceId, controller) {
    return Api.delete(`${RoomDeviceApi.url}/devices/${deviceId}`, {deviceId}, controller);
  }
}