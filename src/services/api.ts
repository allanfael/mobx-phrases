import axios from 'axios';

import { PhrasesDTO } from '@dto/PhrasesDTO';

export const api = async (page: number) => {
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
      };
    }) as PhrasesDTO;

    return phrases;
  } catch (error) {
    return [] as PhrasesDTO[];
  }
};
