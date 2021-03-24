import { action, autorun, observable, makeAutoObservable } from "mobx";

class ProfileStore {

  @observable color = null;

  constructor() {
    makeAutoObservable(this);
  }

  @action
  setColor = (color) => {
    console.log(color)
    this.color = color;
  }
}

export { ProfileStore };
