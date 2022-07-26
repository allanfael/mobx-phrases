import React, { useCallback } from 'react';
import { ListRenderItem } from 'react-native';
import { observer, inject } from 'mobx-react';

import { Content, Empty, Swipe } from '@components';
import { FavoritesStore } from '@store';
import { PhrasesDTO } from '@dto/PhrasesDTO';

import { Container, Divisor } from './styles';

type Props = {
  favoritesStore?: FavoritesStore;
};

const Favorites = ({ favoritesStore }: Props) => {
  const removeFavorite = useCallback((id: string) => {
    favoritesStore.remove(id);
  }, []);

  const renderItem: ListRenderItem<PhrasesDTO> = ({ item }) => {
    return (
      <Swipe onSwipe={() => removeFavorite(item.id)}>
        <Content data={item} hasTranslate={false} hasFavorite={false} />
      </Swipe>
    );
  };

  return (
    <Container
      data={favoritesStore.favorites}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <Divisor />}
      scrollEventThrottle={16}
      ListEmptyComponent={<Empty message='Nenhum post favoritado' />}
      contentInsetAdjustmentBehavior='always'
      maxToRenderPerBatch={50}
    />
  );
};

export default inject('favoritesStore')(observer(Favorites));
