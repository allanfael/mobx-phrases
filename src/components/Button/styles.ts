import styled from 'styled-components/native';

type Props = {
  isTranslated: boolean;
};

export const Pressable = styled.Pressable.attrs({
  hitSlop: {
    top: 10,
    left: 10,
    bottom: 10,
    right: 10,
  },
})``;

export const Container = styled.View<Props>`
  justify-content: center;
  opacity: ${(props) => (props.isTranslated ? 0.3 : 1)};
`;
