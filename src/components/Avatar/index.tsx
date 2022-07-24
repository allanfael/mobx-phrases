import React from 'react';
import { Avatar } from 'native-base';

import colors from '@themes/colors';

const UserAvatar = () => {
  return (
    <Avatar
      bg={colors.silver}
      size='md'
      source={{
        uri: 'https://i.pravatar.cc/300',
      }}
    />
  );
};

export default UserAvatar;
