import axios from 'axios';

import { PhrasesDTO, PhraseApi } from '@dto/PhrasesDTO';
import { ResponseError } from './ResponseError';

export const api = async (page: number): Promise<PhraseApi[]> => {
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
    }) as PhrasesDTO[];

    return phrases;
  } catch (error) {
    throw ResponseError(error);
  }
};
