import React from 'react';
import { ActivityIndicator } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialIconsCommunity from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { Pressable, Container } from './styles';

type ButtonProps = {
  onPress: () => void;
  loading?: boolean;
  isTranslated?: boolean;
  variant?: 'copy' | 'speech' | 'favorite';
};

const Button = ({ onPress, loading, isTranslated, variant }: ButtonProps) => {
  switch (variant) {
    case 'copy':
      return (
        <Container>
          <Pressable onPress={onPress}>
            <MaterialIcons name='content-copy' size={20} />
          </Pressable>
        </Container>
      );
    case 'speech':
      return (
        <Container>
          <Pressable onPress={onPress}>
            <MaterialIconsCommunity name='text-to-speech' size={20} />
          </Pressable>
        </Container>
      );
    case 'favorite':
      return (
        <Container>
          <Pressable onPress={onPress}>
            <FontAwesome name='heart-o' size={20} />
          </Pressable>
        </Container>
      );
    default:
      return (
        <Container>
          {loading ? (
            <ActivityIndicator size='small' />
          ) : (
            <Pressable onPress={onPress}>
              {!isTranslated && <MaterialIcons name='g-translate' size={20} />}
            </Pressable>
          )}
        </Container>
      );
  }
};

export default Button;
