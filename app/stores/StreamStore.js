import { action, autorun, observable } from "mobx";

import BlueberryConnect from '../utils/BlueberryConnect';

class StreamStore {

  @observable value = 0;
  @observable paired = true;
  @observable blueberry = null;
  @observable isPairing = false;

  constructor() {
    console.log('creating store')
    this.blueberry = new BlueberryConnect('blueberry-aa')
  }

  @action 
  pair() {
    console.log('pairing')
    this.setIsPairing(true);
    this.blueberry.connect()
  }

  @action
  setIsPairing(val){
    console.log(val)
    this.isPairing = val;
  }

  @action 
  change(value) {
      this.value += value;
      console.log(this.value)
  }

  @action 
  increment() {
    console.log('chain')
    this.change(1);
  }

  @action 
  decrement() {
    this.change(-1);
  }

}

export { StreamStore };
