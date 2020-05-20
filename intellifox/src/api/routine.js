import { Api } from './api.js';

export { RoutineApi, Routine };

class RoutineApi {
  static get url() {
    return `${Api.baseUrl}/rooms`;
  }

  static add(room, controller) {
   return Api.post(RoutineApi.url, room, controller);
  }

  static modify(room, controller) {
    return Api.put(`${RoutineApi.url}/${room.id}`, room, controller);
  }

  static delete(id, controller) {
    return Api.delete(`${RoutineApi.url}/${id}`, controller);
  }

  static get(id, controller) {
    return Api.get(`${RoutineApi.url}/${id}`, controller);
  }

  static getAll(controller) {
    return Api.get(RoutineApi.url, controller);
  }
}

class Routine {
  constructor(id, name, meta) {
    if (id) {
      this.id = id;
    }
    this.name = name;
    this.meta = meta;
  }
}
