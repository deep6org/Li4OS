import { action, autorun, observable, makeAutoObservable } from "mobx";

import BlueberryConnect from '../utils/BlueberryConnect';

class StreamStore {

  @observable value = 0;
  @observable isPaired = false;
  @observable blueberry = null;
  @observable isPairing = false;
  @observable name = null;
  @observable rootStore = null;

  constructor(rootStore) {
    console.log('creating store')
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  @action 
  pair = () => {
    this.blueberry = new BlueberryConnect(this.name)
    console.log('pairing')
    this.setIsPairing(true);
    this.blueberry.connect()
    this.blueberry.onStateChange((state) => {
      if(!this.isPaired) {
          this.isPaired = true;
      }
      this.rootStore.cabalStore.pushState(state)
      
      // console.log(state)
    });
  }

  @action
  setName = (name) => {
    console.log(name)
    this.name = name;
  }

  @action
  setIsPairing = (val) => {
    this.isPairing = val;
  }

  // load cabals

}

export { StreamStore };
