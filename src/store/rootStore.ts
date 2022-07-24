import { ItemsStore } from './items.store';

class RootStore {
  itemsStore: ItemsStore;

  constructor() {
    this.itemsStore = new ItemsStore();
  }
}

const rootStore = new RootStore();
export default rootStore;
