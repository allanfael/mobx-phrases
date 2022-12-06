export type PhraseApi = {
  id: string;
  tags: string[];
  author: string;
  phrase: string;
  translation: string;
  isFavorite: boolean;
};

export interface PhrasesDTO extends PhraseApi {
  loading: boolean;
}
