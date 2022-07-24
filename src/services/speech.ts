import * as Speech from 'expo-speech';

export const textToSpeech = async (text: string) => {
  Speech.isSpeakingAsync()
    .then((isSpeaking) => {
      if (isSpeaking) {
        Speech.stop();
      }
    })
    .finally(() => {
      Speech.speak(text, {
        language: 'en-US',
        pitch: 1,
        rate: 0.75,
      });
    });
};
