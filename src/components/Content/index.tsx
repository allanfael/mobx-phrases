import React from 'react';
import { HStack, VStack, useToast } from 'native-base';
import { MotiView } from 'moti';
import { inject, observer } from 'mobx-react';

import Avatar from '../Avatar';
import Typography from '../Typography';
import Button from '../Button';
import SnackBar from '../SnackBar';

import { ItemsStore } from '@store';
import { PhrasesDTO } from '@dto/PhrasesDTO';
import { copyToClipboard } from '@utils/clipboard';

interface ContentProps {
  data: PhrasesDTO;
  itemsStore?: ItemsStore;
}

const Content = ({ data, itemsStore }: ContentProps) => {
  const translateText = () => {
    itemsStore.translate(data.phrase, data.id);
  };

  const toast = useToast();

  const copyText = async () => {
    if (!!data.translation) {
      await copyToClipboard(data.translation);

      return toast.show({
        render: () => {
          return <SnackBar message='Tradução copiada com sucesso' />;
        },
      });
    }

    await copyToClipboard(data.phrase);

    return toast.show({
      render: () => {
        return <SnackBar message='Texto copiado com sucesso' />;
      },
    });
  };

  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: 'timing' }}
    >
      <HStack key={data.id} width='full'>
        <Avatar />
        <VStack space={1} mr={20} ml={4}>
          <HStack alignItems='center'>
            <Typography variant='normalBold'>{data.author}</Typography>

            <HStack position='absolute' width='full' left={260} space={1}>
              <Button onPress={copyText} isCopyVariant />

              <Button
                onPress={translateText}
                loading={data.loading}
                isTranslated={!!data.translation}
              />
            </HStack>
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
        </VStack>
      </HStack>
    </MotiView>
  );
};

export default inject('itemsStore')(observer(Content));
