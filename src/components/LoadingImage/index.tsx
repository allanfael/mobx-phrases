import React from 'react';

import { Container, Image } from './styles';

import image from '@assets/images/message.png';

const LoadingImage: React.FC = () => {
  return (
    <Container>
      <Image source={image} resizeMode='contain' />
    </Container>
  );
};

export default LoadingImage;
