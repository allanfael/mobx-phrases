import React, { useEffect, useLayoutEffect } from 'react';
import { ListRenderItem } from 'react-native';
import { observer, inject } from 'mobx-react';
import { StackNavigationProp } from '@react-navigation/stack';

import { Content, Button } from '@components';
import { ItemsStore } from '@store';
import { PhrasesDTO } from '@dto/PhrasesDTO';
import ContentSkeleton from '@shimmers/ContentSkeleton';

import { Container, Divisor, SkeletonContainer } from './styles';

type Props = {
  itemsStore?: ItemsStore;
  navigation: StackNavigationProp<any, any>;
};

const ListItems = ({ itemsStore, navigation }: Props) => {
  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <Button
  //         variant='favorite'
  //         onPress={() => navigation.navigate('FavoritesScreen')}
  //       />
  //     ),
  //   });
  // }, [navigation]);

  useEffect(() => {
    itemsStore.fetch();
  }, []);

  const fetchMore = () => {
    if (!itemsStore.loading.is()) {
      itemsStore.fetchMore();
    }
  };

  const renderItem: ListRenderItem<PhrasesDTO> = ({ item }) => {
    return <Content data={item} />;
  };

  const LoadingFetchMore = (): JSX.Element => (
    <>
      {[1, 2, 3].map((_, index) => (
        <SkeletonContainer key={index}>
          <Divisor />
          <ContentSkeleton />
        </SkeletonContainer>
      ))}
    </>
  );

  const Loading = (): JSX.Element => (
    <>
      {[1, 2, 3, 4, 5, 6].map((_, index) => (
        <SkeletonContainer key={index}>
          <ContentSkeleton />
          <Divisor />
        </SkeletonContainer>
      ))}
    </>
  );

  return (
    <Container
      data={itemsStore.items}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <Divisor />}
      onEndReached={fetchMore}
      onEndReachedThreshold={0.1}
      ListFooterComponent={() =>
        itemsStore.loading.is() &&
        itemsStore.items.length > 0 && <LoadingFetchMore />
      }
      ListEmptyComponent={() => itemsStore.items.length < 1 && <Loading />}
    />
  );
};

export default inject('itemsStore')(observer(ListItems));
