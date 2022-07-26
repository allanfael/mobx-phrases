import React from 'react';
import { ActivityIndicator } from 'react-native';
import { MotiView, useDynamicAnimation } from 'moti';
import { TapGestureHandler } from 'react-native-gesture-handler';
import { useAnimatedGestureHandler } from 'react-native-reanimated';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialIconsCommunity from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { Pressable, Container } from './styles';

type ButtonProps = {
  onPress: () => void;
  loading?: boolean;
  isTranslated?: boolean;
  variant?: 'copy' | 'speech' | 'favorite';
  iconSize?: number;
};

const Button = ({
  onPress,
  loading,
  isTranslated,
  variant,
  iconSize,
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

  switch (variant) {
    case 'copy':
      return (
        <TapGestureHandler onGestureEvent={onGestureEvent}>
          <MotiView style={{ justifyContent: 'center' }} state={animation}>
            <Pressable onPress={onPress}>
              <MaterialIcons name='content-copy' size={iconSize || 20} />
            </Pressable>
          </MotiView>
        </TapGestureHandler>
      );
    case 'speech':
      return (
        <TapGestureHandler onGestureEvent={onGestureEvent}>
          <MotiView style={{ justifyContent: 'center' }} state={animation}>
            <Pressable onPress={onPress}>
              <MaterialIconsCommunity
                name='text-to-speech'
                size={iconSize || 22}
              />
            </Pressable>
          </MotiView>
        </TapGestureHandler>
      );
    case 'favorite':
      return (
        <TapGestureHandler onGestureEvent={onGestureEvent}>
          <MotiView style={{ justifyContent: 'center' }} state={animation}>
            <Pressable onPress={onPress}>
              <FontAwesome name='heart-o' size={iconSize || 20} />
            </Pressable>
          </MotiView>
        </TapGestureHandler>
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
