import React from 'react';
import { Center } from 'native-base';

import Typography from '../Typography';

type EmptyProps = {
  message: string;
};

const Empty = ({ message }: EmptyProps) => {
  return (
    <Center mt={10}>
      <Typography variant='normalMedium'>{message}</Typography>
    </Center>
  );
};

export default Empty;
