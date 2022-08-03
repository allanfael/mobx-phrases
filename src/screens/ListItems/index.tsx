import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ListRenderItem, Platform, RefreshControl } from 'react-native';
import { observer, inject } from 'mobx-react';

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
  navigation: any;
};

const ListItems = ({ itemsStore, navigation }: Props) => {
  const [author, setAuthor] = useState('');

  const SearchOptionsIOS = Platform.OS === 'ios' && {
    headerSearchBarOptions: {
      placeholder: 'Buscar autor',
      cancelButtonText: 'Cancelar',
      autoCapitalize: 'words',
      onChangeText(event) {
        setAuthor(event.nativeEvent.text);
      },
      onCancelButtonPress() {
        setAuthor('');
      },
      onSearchButtonPress() {
        searchByAuthor();
      },
    },
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          variant='favoriteNavigation'
          onPress={() => navigation.navigate('FavoritesScreen')}
        />
      ),
      ...SearchOptionsIOS,
    });
  }, [navigation, author]);

  useEffect(() => {
    itemsStore.initialFetch();
  }, []);

  const fetchMore = () => {
    if (!itemsStore.loading.is()) {
      itemsStore.fetchMore();
    }
  };

  const searchByAuthor = () => {
    itemsStore.searchByAuthor(author);
  };

  const renderItem: ListRenderItem<PhrasesDTO> = ({ item }) => {
    return <Content data={item} />;
  };

  const LoadingFetchMore = (): JSX.Element => (
    <>{!itemsStore.errorMessage && <ActivityIndicator size='small' />}</>
  );

  const EmptyComponent = (): JSX.Element => (
    <>
      {itemsStore.errorMessage ? (
        <Empty message={itemsStore.errorMessage} />
      ) : (
        [1, 2, 3, 4, 5, 6].map((_, index) => (
          <SkeletonContainer key={index}>
            <ContentSkeleton />
            <Divisor />
          </SkeletonContainer>
        ))
      )}
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
