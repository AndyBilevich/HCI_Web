import { Api } from './api.js';

export { RoutineApi, Routine };

class RoutineApi {
  static get url() {
    return `${Api.baseUrl}/routines`;
  }

  static add(routine, controller) {
    return Api.post(RoutineApi.url, routine, controller);
  }

  static modify(routine, controller) {
    return Api.put(`${RoutineApi.url}/${routine.id}`, routine, controller);
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

  static execute(id, controller) {
    return Api.put(`${RoutineApi.url}/${id}/execute`, null, controller);
  }
}

class Routine {
  constructor(id, name, actions, meta) {
    if (id) {
      this.id = id;
    }
    this.name = name;
    this.actions = actions;
    this.meta = meta;
  }
}
