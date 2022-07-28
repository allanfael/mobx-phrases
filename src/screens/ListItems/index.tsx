import React, { useEffect, useLayoutEffect } from 'react';
import { ListRenderItem, RefreshControl } from 'react-native';
import { observer, inject } from 'mobx-react';
import { StackNavigationProp } from '@react-navigation/stack';

import { Content, Button, Empty } from '@components';
import { ItemsStore } from '@store';
import { PhrasesDTO } from '@dto/PhrasesDTO';
import ContentSkeleton from '@shimmers/ContentSkeleton';

import {
  Container,
  Divisor,
  SkeletonContainer,
  ActivityIndicator,
} from './styles';

type Props = {
  itemsStore?: ItemsStore;
  navigation: StackNavigationProp<any, any>;
};

const ListItems = ({ itemsStore, navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          variant='favoriteNavigation'
          onPress={() => navigation.navigate('FavoritesScreen')}
        />
      ),
    });
  }, [navigation]);

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
    <>{itemsStore.fetchMore && <ActivityIndicator size='small' />}</>
  );

  const EmptyComponent = (): JSX.Element => (
    <>
      {itemsStore.items.length < 1 &&
        [1, 2, 3, 4, 5, 6].map((_, index) => (
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
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={itemsStore.loadingTryAgain.is()}
          onRefresh={() => {
            itemsStore.tryAgain();
          }}
        />
      }
      ItemSeparatorComponent={() => <Divisor />}
      onEndReached={fetchMore}
      onEndReachedThreshold={0.2}
      ListFooterComponent={() => <LoadingFetchMore />}
      ListEmptyComponent={() => <EmptyComponent />}
      contentInsetAdjustmentBehavior='always'
    />
  );
};

export default inject('itemsStore')(observer(ListItems));
