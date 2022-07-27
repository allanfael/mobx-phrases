import React from 'react';
import { Avatar } from 'native-base';

import avatar from '@assets/images/avatar.png';

const UserAvatar = () => {
  return (
    <Avatar
      bg='gray.100'
      source={avatar}
      _image={{
        resizeMode: 'contain',
      }}
    />
  );
};

export default UserAvatar;
