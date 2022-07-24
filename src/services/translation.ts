import translate from 'translate-google-api';

export const translatedTextService = async (text: string) => {
  try {
    const result = await translate(text, {
      to: 'pt',
    });

    console.log('translated text:', result[0]);

    return result[0];
  } catch (error) {
    return 'Não foi possível traduzir';
  }
};
