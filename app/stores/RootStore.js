import { StreamStore } from "./StreamStore";
import { ProfileStore } from "./ProfileStore";
import { CabalStore } from "./CabalStore";

class RootStore {
  //
  streamStore;
  profileStore;
  cabalStore;
  // Following the MobX best practices documentation,
  // https://mobx.js.org/best/store.html use a root store
  // to provide support breaking the application state into
  // multiple child stores
  constructor() {
  	this.streamStore = new StreamStore(this);
  	this.profileStore = new ProfileStore(this);
  	this.cabalStore = new CabalStore(this);
  	// load from disk
  	// this.cabalStore.loadFromDisk()
  }
}

export { RootStore };
