import { action, makeObservable, observable, runInAction } from 'mobx';
import { LoadingState } from 'mobx-loading-state';

import { PhrasesDTO } from '@dto/PhrasesDTO';

import { api } from '@services/api';
import { translatedTextService } from '@services/translation';

export class ItemsStore {
  loading = new LoadingState();
  items: PhrasesDTO[] = [];

  constructor() {
    makeObservable(this, {
      fetch: action,
      update: action,
      loading: observable,
      items: observable,
    });
  }

  async fetch() {
    this.loading.on();
    const data = await api(1);

    runInAction(() => {
      this.items = data as PhrasesDTO[];
    });

    this.loading.off();
  }

  async update(page: number) {
    this.loading.on();
    const data = await api(page);

    runInAction(() => {
      this.items.push(...(data as PhrasesDTO[]));
    });

    this.loading.off();
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