import { makeAutoObservable, runInAction } from 'mobx';

import { PhrasesDTO, PhraseApi } from '@dto/PhrasesDTO';

import { api } from '@services/api';
import { translatedTextService } from '@services/translation';
import { rootStore } from './rootStore';

export class ItemsStore {
  loading = false;
  items: PhrasesDTO[] = [];
  page = 2;

  constructor() {
    makeAutoObservable(this);
  }

  isFavorite = (data: PhraseApi[]) => {
    const favoriteStore = rootStore.favoritesStore;

    for (let i = 0; i < data.length; i++) {
      if (
        favoriteStore.favorites.find((favorite) => favorite.id === data[i].id)
      ) {
        data[i].isFavorite = true;
      }
    }
  };

  async fetch() {
    const data = await api(1);

    runInAction(() => {
      this.isFavorite(data);
      this.items = data as PhrasesDTO[];
    });
  }

  async fetchMore() {
    const data = await api(this.page);

    runInAction(() => {
      this.isFavorite(data);
      this.items.push(...(data as PhrasesDTO[]));
      this.page++;
    });
  }

  async translate(text: string, id: string) {
    runInAction(() => {
      this.items.find((item) => item.id === id).loading = true;
    });

    const data = await translatedTextService(text);

    runInAction(() => {
      this.items.find((item) => item.id === id).translation = data;
      this.items.find((item) => item.id === id).loading = false;
    });
  }
}
