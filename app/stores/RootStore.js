import { StreamStore } from "./StreamStore";

class RootStore {
  //
  // Following the MobX best practices documentation,
  // https://mobx.js.org/best/store.html use a root store
  // to provide support breaking the application state into
  // multiple child stores
  streamStore = new StreamStore();
}

export { RootStore };
