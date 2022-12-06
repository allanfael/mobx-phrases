import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncTrunk } from 'mobx-sync';

import { ItemsStore } from './items.store';
import { FavoritesStore } from './favorites.store';

class RootStore {
  itemsStore: ItemsStore;
  favoritesStore: FavoritesStore;

  constructor() {
    this.itemsStore = new ItemsStore();
    this.favoritesStore = new FavoritesStore();
  }
}

const rootStore = new RootStore();

export const trunk = new AsyncTrunk(rootStore.favoritesStore, {
  storage: AsyncStorage,
});

export { rootStore };
