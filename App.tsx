import 'react-native-gesture-handler';
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
import rootStore, { trunk } from '@store/rootStore';

SplashScreen.preventAutoHideAsync();

export default function App() {
  let [fontsLoaded] = useFonts({
    Muli_400Regular,
    Muli_600SemiBold,
    Muli_700Bold,
  });

  const [isStoreLoaded, setIsStoreLoaded] = useState(false);

  useEffect(() => {
    const rehydrate = async () => {
      await trunk.init();
      setIsStoreLoaded(true);
    };

    rehydrate();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 1000);
  }, []);

  if (!fontsLoaded || !isStoreLoaded) {
    return null;
  } else {
    onLayoutRootView();
  }

  return (
    <Provider {...rootStore}>
      <ThemeProvider theme={colors}>
        <NativeBaseProvider>
          <StatusBar style='auto' />
          <RootNavigator />
        </NativeBaseProvider>
      </ThemeProvider>
    </Provider>
  );
}
