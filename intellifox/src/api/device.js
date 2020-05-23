import { Api } from './api.js';

export { DeviceApi, Device };

class DeviceApi {
  static get url() {
    return `${Api.baseUrl}/devices`;
  }

  static add(device, controller) {
   return Api.post(DeviceApi.url, device, controller);
  }

  static modify(device, controller) {
    return Api.put(`${DeviceApi.url}/${device.id}`, {name: device.name, meta: device.meta}, controller);
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

  static getLogs(id, limit, offset, controller) {
    return Api.get(`${DeviceApi.url}/${id}/logs/limit/${limit}/offset/${offset}`, controller);
  }

  static getAllLogs(limit, offset, controller) {
    return Api.get(`${DeviceApi.url}/logs/limit/${limit}/offset/${offset}`, controller);
  }

  static getEvents(id, controller) {
    return Api.get(`${DeviceApi.url}/${id}/events`, controller);
  }

  static getAllEvents(controller) {
    return Api.get(`${DeviceApi.url}/events`, controller);
  }

  static getState(id, controller) {
    return Api.get(`${DeviceApi.url}/${id}/state`, controller);
  }

  static setAction(id, actionName, body, controller) {
    return Api.put(`${DeviceApi.url}/${id}/${actionName}`, body, controller);
  }

  static getDevicesByType(typeId, controller) {
    return Api.get(`${DeviceApi.url}/devicetypes/${typeId}/`, controller);
  }
}

class Device {
  constructor(id, type, name, meta) {
    if (id) {
      this.id = id;
    }
    this.type = type;
    this.name = name;
    this.meta = meta;
  }
}
