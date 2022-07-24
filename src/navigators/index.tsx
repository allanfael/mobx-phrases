import React from 'react';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  createStackNavigator,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      FavoritesScreen: string;
    }
  }
}

import colors from 'themes/colors';
import { Button } from '@components';

// Screens
import List from '../screens/ListItems';
import Favorites from '../screens/Favorites';

const Navigators = () => {
  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      background: colors.background,
    },
  };

  const Stack = createStackNavigator();

  return (
    <NavigationContainer theme={CustomDefaultTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
          headerTintColor: '#000',
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen
          name='ListScreen'
          component={List}
          options={{
            headerTitle: 'Frases',
            headerRightContainerStyle: {
              padding: 6,
            },
          }}
        />
        <Stack.Screen
          name='FavoritesScreen'
          component={Favorites}
          options={{
            headerTitle: 'Favoritos',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigators;
