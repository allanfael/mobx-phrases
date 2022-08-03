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
  errorMessage = '';

  constructor() {
    makeAutoObservable(this);
  }

  private handleFavorite(arr: PhrasesDTO[]) {
    const favoriteStore = rootStore.favoritesStore;

    for (let i = 0; i < arr.length; i++) {
      if (
        favoriteStore.favorites.find((favorite) => favorite.id === arr[i].id)
      ) {
        arr[i].isFavorite = true;
      }
    }
  }

  isArrayEmpty(arr: PhrasesDTO[], message: string) {
    if (arr.length < 1) this.errorMessage = message;
  }

  private async fetch() {
    this.errorMessage = '';
    const data = await api.fetch(1);

    runInAction(() => {
      this.items = data as PhrasesDTO[];
      this.isArrayEmpty(this.items, 'Não foi possível carregar o conteúdo');
      this.handleFavorite(this.items);
    });
  }

  initialFetch() {
    this.loading.on();
    this.fetch();
    this.loading.off();
  }

  tryAgain() {
    this.loadingTryAgain.on();
    this.fetch();
    this.loadingTryAgain.off();
  }

  async fetchMore() {
    this.loadingFetchMore.on();
    const data = await api.fetch(this.page);

    runInAction(() => {
      this.items.push(...(data as PhrasesDTO[]));
      this.handleFavorite(this.items);
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

  async searchByAuthor(author: string) {
    this.loading.on();
    this.errorMessage = '';
    const data = await api.searchByAuthor(author);

    runInAction(() => {
      this.items = data as PhrasesDTO[];
      this.isArrayEmpty(this.items, 'Não foi possível encontrar autor');
      this.handleFavorite(this.items);
      this.loading.off();
    });
  }
}
