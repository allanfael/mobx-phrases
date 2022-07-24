import React from 'react';
import { ActivityIndicator } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { Pressable, Container } from './styles';

type ButtonProps = {
  onPress: () => void;
  loading?: boolean;
  isTranslated?: boolean;
  isCopyVariant?: boolean;
};

const Button = ({
  onPress,
  loading,
  isTranslated,
  isCopyVariant,
}: ButtonProps) => {
  if (isCopyVariant) {
    return (
      <Container>
        <Pressable onPress={onPress}>
          <MaterialIcons name='content-copy' size={20} />
        </Pressable>
      </Container>
    );
  }

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
};

export default Button;
