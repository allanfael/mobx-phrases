import 'react-native-gesture-handler';
import { LogBox } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import { ThemeProvider } from 'styled-components/native';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  Muli_400Regular,
  Muli_600SemiBold,
  Muli_700Bold,
} from '@expo-google-fonts/muli';
import { Provider } from 'mobx-react';

import RootNavigator from '@navigator';
import colors from '@themes/colors';
import { trunk, rootStore } from '@store/rootStore';

LogBox.ignoreLogs(['Require cycles are allowed']);

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Muli_400Regular,
    Muli_600SemiBold,
    Muli_700Bold,
  });

  const [isStoreLoaded, setIsStoreLoaded] = useState(false);

  const onLayoutRootView = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    const rehydrate = async () => {
      await trunk.init();
      setIsStoreLoaded(true);
    };

    rehydrate();
  }, []);

  if (!fontsLoaded || !isStoreLoaded) {
    return null;
  } else {
    onLayoutRootView();
  }

  return (
    <ThemeProvider theme={colors}>
      <Provider {...rootStore}>
        <NativeBaseProvider>
          <StatusBar style='auto' />
          <RootNavigator />
        </NativeBaseProvider>
      </Provider>
    </ThemeProvider>
  );
}
