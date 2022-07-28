import { makeAutoObservable, runInAction } from 'mobx';

import { PhrasesDTO } from '@dto/PhrasesDTO';
import rootStore from './rootStore';

export class FavoritesStore {
  favorites: PhrasesDTO[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  handleFavorite(item: PhrasesDTO) {
    if (!this.favorites.find((favorite) => favorite.id === item.id)) {
      this.add(item);
    } else {
      this.remove(item.id);
    }
  }

  private add(item: PhrasesDTO) {
    runInAction(() => {
      this.favorites.push(item);
      rootStore.itemsStore.items.find((i) => i.id === item.id).isFavorite =
        true;
    });
  }

  private remove(id: string) {
    runInAction(() => {
      this.favorites = this.favorites.filter((favorite) => favorite.id !== id);
      rootStore.itemsStore.items.find((item) => item.id === id).isFavorite =
        false;
    });
  }
}
