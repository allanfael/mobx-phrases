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
      ListScreen: string;
    }
  }
}

import colors from 'themes/colors';

// Screens
import List from '../screens/ListItems';

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
        }}
      >
        <Stack.Screen
          name='ListScreen'
          component={List}
          options={{
            headerTitle: 'Frases',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigators;
