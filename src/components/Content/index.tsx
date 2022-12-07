import React from 'react';
import { HStack, VStack, useToast } from 'native-base';
import { MotiView } from 'moti';
import { inject, observer } from 'mobx-react';

import Avatar from '../Avatar';
import Typography from '../Typography';
import Button from '../Button';
import SnackBar from '../SnackBar';

import { ItemsStore, FavoritesStore } from '@store';

import { PhrasesDTO } from '@dto/PhrasesDTO';
import { copyToClipboard } from '@utils/clipboard';
import { textToSpeech } from '@services/speech';

interface ContentProps {
  data: PhrasesDTO;
  itemsStore?: ItemsStore;
  favoritesStore?: FavoritesStore;
  hasTextToSpeech?: boolean;
  hasCopy?: boolean;
  hasFavorite?: boolean;
  hasTranslate?: boolean;
}

const Content = ({
  data,
  itemsStore,
  favoritesStore,
  hasCopy = true,
  hasFavorite = true,
  hasTextToSpeech = true,
  hasTranslate = true,
}: ContentProps) => {
  const translateText = () => {
    itemsStore.translate(data.phrase, data.id);
  };

  const speechText = () => {
    textToSpeech(data.phrase);
  };

  const toast = useToast();

  const copyText = () => {
    if (!!data.translation) {
      copyToClipboard(data.translation);
      return toast.show({
        render: () => {
          return <SnackBar message='Tradução copiada com sucesso' />;
        },
      });
    }

    copyToClipboard(data.phrase);
    toast.show({
      render: () => {
        return <SnackBar message='Texto copiado com sucesso' />;
      },
    });
  };

  const handleFavorites = () => {
    favoritesStore.handleFavorite(data);
  };

  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: 'spring' }}
    >
      <HStack key={data.id} width='full'>
        <Avatar />
        <VStack space={1} pr={20} pl={4}>
          <HStack alignItems='center'>
            <Typography variant='normalBold'>{data.author}</Typography>
          </HStack>

          <VStack>
            <Typography variant='normalRegular'>{data.phrase}</Typography>
          </VStack>

          {!!data.translation && (
            <HStack>
              <Typography variant='normalMedium'>{data.translation}</Typography>
            </HStack>
          )}
          <HStack mt={2} mr={4}>
            <Typography variant='normalBold'>Tags: </Typography>
            <Typography variant='normalRegular' color='gray'>
              {data.tags}
            </Typography>
          </HStack>

          <HStack mt={2} space={7}>
            {hasTextToSpeech && (
              <Button onPress={speechText} variant='speech' />
            )}
            {hasCopy && <Button onPress={copyText} variant='copy' />}
            {hasTranslate && (
              <Button
                onPress={translateText}
                loading={data.loading}
                isTranslated={!!data.translation}
              />
            )}
            {hasFavorite && (
              <Button
                onPress={handleFavorites}
                variant='favorite'
                iconSize={18}
                isFavorite={data.isFavorite}
              />
            )}
          </HStack>
        </VStack>
      </HStack>
    </MotiView>
  );
};

export default inject('itemsStore', 'favoritesStore')(observer(Content));
