import {
  RESPONSE_API_CODE,
  RESPONSE_API_MESSAGE,
} from '@utils/enum/responseApiMessage';

const defaultErrorMessage = 'Verifique sua internet e tente novamente.';

interface ErrorProps {
  message: string;
  code: RESPONSE_API_CODE;
}

export const ResponseError = (error) => {
  const { message, code } = error as ErrorProps;

  if (RESPONSE_API_CODE[code]) {
    return {
      message: RESPONSE_API_MESSAGE[code],
    };
  }

  return {
    message: message || defaultErrorMessage,
  };
};
