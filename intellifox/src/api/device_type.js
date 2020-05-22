import { Api } from './api.js';

export { DeviceTypeApi };

class DeviceTypeApi {
  static get url() {
    return `${Api.baseUrl}/devicetypes`;
  }

  static get(id, controller) {
    return Api.get(`${DeviceTypeApi.url}/${id}`, controller);
  }

  static getAll(controller) {
    return Api.get(DeviceTypeApi.url, controller);
  }
}

