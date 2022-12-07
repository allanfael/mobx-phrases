import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ListRenderItem, RefreshControl } from 'react-native';
import { observer, inject } from 'mobx-react';
import { StackNavigationProp } from '@react-navigation/stack';
import { useToast } from 'native-base';

import { Content, Button, SnackBar, Typography } from '@components';
import { ItemsStore } from '@store';
import { PhrasesDTO } from '@dto/PhrasesDTO';
import ContentSkeleton from '@shimmers/ContentSkeleton';

import {
  Container,
  Divisor,
  SkeletonContainer,
  ActivityIndicator,
  EmptyList,
} from './styles';

type Props = {
  itemsStore?: ItemsStore;
  navigation: StackNavigationProp<any, any>;
};

const ListItems = ({ itemsStore, navigation }: Props) => {
  const [loading, setLoading] = useState(false);
  const [loadingFetchMore, setLoadingFetchMore] = useState(false);
  const [loadingRefresh, setLoadingRefresh] = useState(false);

  const toast = useToast();

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
    fetch();
  }, []);

  const fetch = async (isRefresh?: boolean): Promise<void> => {
    try {
      isRefresh ? setLoadingRefresh(true) : setLoading(true);
      await itemsStore.fetch();
    } catch (error) {
      toast.show({
        render: () => {
          return <SnackBar message={error.message} type='error' />;
        },
      });
    } finally {
      isRefresh ? setLoadingRefresh(false) : setLoading(false);
    }
  };

  const fetchMore = async (): Promise<void> => {
    if (!loadingFetchMore) {
      try {
        setLoadingFetchMore(true);
        await itemsStore.fetchMore();
      } catch (error) {
        setLoadingFetchMore(false);
      } finally {
        setLoadingFetchMore(false);
      }
    }
  };

  const renderItem: ListRenderItem<PhrasesDTO> = ({ item }) => {
    return <Content data={item} />;
  };

  const LoadingFetchMore = (): JSX.Element => (
    <>{loadingFetchMore && <ActivityIndicator size='small' />}</>
  );

  const EmptyComponent = (): JSX.Element => (
    <>
      {loading ? (
        [1, 2, 3, 4, 5, 6].map((_, index) => (
          <SkeletonContainer key={index}>
            <ContentSkeleton />
            <Divisor />
          </SkeletonContainer>
        ))
      ) : (
        <EmptyList>
          <Typography variant='normalRegular'>Ops! Algo deu errado</Typography>
          <Typography variant='normalRegular'>Tente novamente</Typography>
        </EmptyList>
      )}
    </>
  );

  return (
    <Container
      data={itemsStore.items}
      keyExtractor={(item: PhrasesDTO) => item.id.toString()}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={loadingRefresh}
          onRefresh={() => {
            fetch(true);
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
