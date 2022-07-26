import { makeAutoObservable, observable } from 'mobx';

import { PhrasesDTO } from '@dto/PhrasesDTO';

export class FavoritesStore {
  favorites: PhrasesDTO[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async add(item: PhrasesDTO) {
    if (!this.favorites.find((favorite) => favorite.id === item.id)) {
      this.favorites.push(item);

      return true;
    }

    return false;
  }

  remove(id: string) {
    this.favorites = this.favorites.filter((favorite) => favorite.id !== id);
  }
}
