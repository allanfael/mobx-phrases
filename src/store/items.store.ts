import { makeAutoObservable, runInAction } from 'mobx';
import { LoadingState } from 'mobx-loading-state';

import { PhrasesDTO } from '@dto/PhrasesDTO';

import { api } from '@services/api';
import { translatedTextService } from '@services/translation';
import rootStore from './rootStore';

export class ItemsStore {
  loading = new LoadingState();
  loadingFetchMore = new LoadingState();
  loadingTryAgain = new LoadingState();
  items: PhrasesDTO[] = [];
  page = 2;

  constructor() {
    makeAutoObservable(this);
  }

  async fetch() {
    this.loading.on();
    const data = await api(1);
    const favoriteStore = rootStore.favoritesStore;

    runInAction(() => {
      // CHECK IF ITEM IS FAVORITE
      for (let i = 0; i < data.length; i++) {
        if (
          favoriteStore.favorites.find((favorite) => favorite.id === data[i].id)
        ) {
          data[i].isFavorite = true;
        }
      }

      this.items = data as PhrasesDTO[];

      this.loading.off();
    });
  }

  async tryAgain() {
    this.loadingTryAgain.on();
    const data = await api(1);
    const favoriteStore = rootStore.favoritesStore;

    runInAction(() => {
      for (let i = 0; i < data.length; i++) {
        if (
          favoriteStore.favorites.find((favorite) => favorite.id === data[i].id)
        ) {
          data[i].isFavorite = true;
        }
      }
      this.items = data as PhrasesDTO[];
      this.loadingTryAgain.off();
    });
  }

  async fetchMore() {
    this.loadingFetchMore.on();
    const data = await api(this.page);
    const favoriteStore = rootStore.favoritesStore;

    runInAction(() => {
      for (let i = 0; i < data.length; i++) {
        if (
          favoriteStore.favorites.find((favorite) => favorite.id === data[i].id)
        ) {
          data[i].isFavorite = true;
        }
      }
      this.items.push(...(data as PhrasesDTO[]));
      this.page++;
      this.loadingFetchMore.off();
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
