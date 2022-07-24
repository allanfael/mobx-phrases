import styled from 'styled-components/native';

export const Pressable = styled.Pressable.attrs({
  hitSlop: {
    top: 10,
    left: 10,
    bottom: 10,
    right: 10,
  },
})``;

export const Container = styled.View`
  justify-content: center;
  align-items: center;
  height: 24px;
  width: 24px;
`;
