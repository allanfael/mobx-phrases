import React from 'react';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      FavoritesScreen: string;
    }
  }
}

import colors from 'themes/colors';

// Screens
import List from '../screens/ListItems';
import Favorites from '../screens/Favorites';
import { Platform } from 'react-native';

const Navigators = () => {
  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      background: colors.background,
    },
  };

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer theme={CustomDefaultTheme}>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: '#000',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontFamily: 'Muli_700Bold',
          },
          headerTransparent: Platform.OS === 'ios',
          headerBlurEffect: 'light',
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name='ListScreen'
          component={List}
          options={{
            headerTitle: 'Frases',
            headerLargeTitle: true,
            headerLargeTitleStyle: {
              fontFamily: 'Muli_700Bold',
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
