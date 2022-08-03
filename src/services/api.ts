import axios from 'axios';

import { PhrasesDTO } from '@dto/PhrasesDTO';

export const api = {
  fetch: async (page: number) => {
    try {
      const { data } = await axios.get(
        `https://api.quotable.io/quotes?page=${page}`
      );

      const phrases = data.results.map((item) => {
        return {
          id: item._id,
          tags: item?.tags.join(', '),
          author: item.author,
          phrase: item.content,
          isFavorite: false,
        };
      }) as PhrasesDTO;

      return phrases;
    } catch (error) {
      return [] as PhrasesDTO[];
    }
  },
  searchByAuthor: async (author: string) => {
    try {
      const { data } = await axios.get(
        `https://api.quotable.io/quotes?author=${author}`
      );

      const phrases = data.results.map((item) => {
        return {
          id: item._id,
          tags: item?.tags.join(', '),
          author: item.author,
          phrase: item.content,
          isFavorite: false,
        };
      }) as PhrasesDTO;

      return phrases;
    } catch (error) {
      return [] as PhrasesDTO[];
    }
  },
};
