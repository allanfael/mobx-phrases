import React from 'react';
import { HStack } from 'native-base';

import Typography from '../Typography';

type SnackBarProps = {
  message: string;
  type?: 'success' | 'error';
};

const SnackBar = ({ message, type = 'success' }: SnackBarProps) => {
  const backgroundColor = type === 'success' ? '#000' : '#FF5252';
  return (
    <HStack p={5} pl={10} pr={10} bg={backgroundColor} rounded={4}>
      <Typography variant='normalRegular' color='background'>
        {message}
      </Typography>
    </HStack>
  );
};

export default SnackBar;
