import { action, autorun, observable, makeAutoObservable } from "mobx";

import BlueberryConnect from '../utils/BlueberryConnect';

class StreamStore {

  @observable value = 0;
  @observable isPaired = false;
  @observable blueberry = null;
  @observable isPairing = false;
  @observable name = null;

  constructor() {
    console.log('creating store')
    makeAutoObservable(this);
  }

  @action 
  pair = () => {
    this.blueberry = new BlueberryConnect(this.name)
    console.log('pairing')
    this.setIsPairing(true);
    this.blueberry.connect()
    this.blueberry.onStateChange((state) => {
      console.log(this.isPaired)
      if(!this.isPaired) {
          this.isPaired = true;
      }
      console.log(state)
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
}

export { StreamStore };
