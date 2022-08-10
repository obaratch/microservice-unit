export class Store {
  name = undefined;
  state = {};
  constructor(name, initial) {
    this.name = name;
    this.state = { ...this.state, ...initial };
  }
}

export const Global = new Store("global", { user: undefined });
