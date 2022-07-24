import React from 'react';
import { HStack } from 'native-base';

import Typography from '../Typography';

type SnackBarProps = {
  message: string;
};

const SnackBar = ({ message }: SnackBarProps) => {
  return (
    <HStack p={5} pl={20} pr={20} bg='#000' rounded={4}>
      <Typography variant='normalRegular' color='background'>
        {message}
      </Typography>
    </HStack>
  );
};

export default SnackBar;
