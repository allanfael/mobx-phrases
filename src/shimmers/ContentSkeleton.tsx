import React, { useReducer } from 'react';
import { MotiView } from 'moti';
import { Skeleton } from 'moti/skeleton';
import { HStack, VStack } from 'native-base';

const Spacer = ({ height = 16 }) => <MotiView style={{ height }} />;

export default function ContentSkeleton() {
  const [dark, toggle] = useReducer((s) => !s, true);

  const colorMode = !dark ? 'dark' : 'light';

  return (
    <MotiView
      transition={{
        type: 'timing',
      }}
      animate={{ backgroundColor: !dark ? '#000000' : '#ffffff' }}
    >
      <HStack width='full'>
        <Skeleton colorMode={colorMode} radius='round' height={48} width={48} />
        <Spacer />
        <VStack space={1} mr={20} ml={4}>
          <Skeleton colorMode={colorMode} width={'100%'} height={14} />
          <Spacer height={8} />
          <Skeleton colorMode={colorMode} width={'100%'} height={14} />
          <Spacer height={8} />
          <Skeleton colorMode={colorMode} width={'80%'} height={14} />
          <Spacer height={8} />
          <Skeleton colorMode={colorMode} width={'100%'} height={14} />
        </VStack>
      </HStack>
    </MotiView>
  );
}
