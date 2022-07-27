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
      return copyToClipboard(data.translation).then(() => {
        return toast.show({
          render: () => {
            return <SnackBar message='Tradução copiada com sucesso' />;
          },
        });
      });
    }

    return copyToClipboard(data.phrase).then(() => {
      return toast.show({
        render: () => {
          return <SnackBar message='Texto copiado com sucesso' />;
        },
      });
    });
  };

  const addToFavorites = async () => {
    favoritesStore.add(data).then((isAdd) => {
      if (isAdd) {
        return toast.show({
          render: () => {
            return <SnackBar message='Adicionado aos favoritos' />;
          },
          duration: 1500,
        });
      }

      toast.show({
        render: () => {
          return <SnackBar message='Ops! Post já favoritado' />;
        },
        duration: 1500,
      });
    });

    toast.show({
      render: () => {
        return <SnackBar message='Adicionado aos favoritos' />;
      },
      duration: 1500,
    });
  };

  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: 'spring' }}
    >
      <HStack key={data.id} width='full'>
        <Avatar />
        <VStack space={1} mr={20} ml={4}>
          <HStack alignItems='center'>
            <Typography variant='normalBold'>{data.author}</Typography>
          </HStack>

          <Typography variant='normalRegular'>{data.phrase}</Typography>
          {!!data.translation && (
            <HStack>
              <Typography variant='normalMedium'>{data.translation}</Typography>
            </HStack>
          )}
          <HStack mt={2}>
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
                onPress={addToFavorites}
                variant='favorite'
                iconSize={18}
              />
            )}
          </HStack>
        </VStack>
      </HStack>
    </MotiView>
  );
};

export default inject('itemsStore', 'favoritesStore')(observer(Content));
