import React from 'react';
import { ActivityIndicator } from 'react-native';
import { MotiView, useDynamicAnimation } from 'moti';
import {
  GestureHandlerRootView,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import { useAnimatedGestureHandler } from 'react-native-reanimated';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialIconsCommunity from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { Pressable, Container } from './styles';

type ButtonProps = {
  onPress: () => void;
  loading?: boolean;
  isTranslated?: boolean;
  isFavorite?: boolean;
  variant?: 'copy' | 'speech' | 'favorite' | 'favoriteNavigation';
  iconSize?: number;
};

const Button = ({
  onPress,
  loading,
  isTranslated,
  variant,
  iconSize,
  isFavorite,
}: ButtonProps) => {
  const animation = useDynamicAnimation(() => ({
    scale: 1,
  }));

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: () => {
      animation.animateTo({ scale: 2 });
    },
    onEnd: () => {
      animation.animateTo({ scale: 1 });
    },
  });

  const TapAnimation = ({ children }: { children: React.ReactNode }) => (
    <GestureHandlerRootView>
      <TapGestureHandler onHandlerStateChange={onGestureEvent}>
        <MotiView style={{ justifyContent: 'center' }} state={animation}>
          {children}
        </MotiView>
      </TapGestureHandler>
    </GestureHandlerRootView>
  );

  switch (variant) {
    case 'copy':
      return (
        <TapAnimation>
          <Pressable onPress={onPress}>
            <MaterialIcons name='content-copy' size={iconSize || 20} />
          </Pressable>
        </TapAnimation>
      );
    case 'speech':
      return (
        <TapAnimation>
          <Pressable onPress={onPress}>
            <MaterialIconsCommunity
              name='text-to-speech'
              size={iconSize || 22}
            />
          </Pressable>
        </TapAnimation>
      );
    case 'favorite':
      return (
        <TapAnimation>
          <Pressable onPress={onPress}>
            <FontAwesome
              name={isFavorite ? 'heart' : 'heart-o'}
              size={iconSize || 20}
              color={isFavorite && '#f00'}
            />
          </Pressable>
        </TapAnimation>
      );
    case 'favoriteNavigation':
      return (
        <Pressable onPress={onPress}>
          <FontAwesome name='heart-o' size={iconSize || 20} />
        </Pressable>
      );
    default:
      return (
        <Container isTranslated={isTranslated}>
          {loading ? (
            <ActivityIndicator size='small' />
          ) : (
            <Pressable onPress={onPress} disabled={isTranslated}>
              <MaterialIcons name='g-translate' size={iconSize || 20} />
            </Pressable>
          )}
        </Container>
      );
  }
};

export default Button;
