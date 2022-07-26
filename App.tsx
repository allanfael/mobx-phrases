import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import { ThemeProvider } from 'styled-components/native';
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

  if (!fontsLoaded || !isStoreLoaded) {
    return null;
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
