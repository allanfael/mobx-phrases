import styled from 'styled-components/native';
import { ScrollView } from 'react-native-gesture-handler';

export const Container = styled.FlatList.attrs({
  contentContainerStyle: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 20,
  },
})``;

export const Divisor = styled.View`
  width: 100%;
  height: 0.5px;
  background-color: ${({ theme }) => theme.silverLight};
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const SkeletonContainer = styled.View``;

export const ActivityIndicator = styled.ActivityIndicator`
  align-self: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;
