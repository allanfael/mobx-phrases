export enum RESPONSE_API_CODE {
  ERR_NETWORK = 'ERR_NETWORK',
}

export const RESPONSE_API_MESSAGE = {
  [RESPONSE_API_CODE.ERR_NETWORK]: 'Verifique sua internet e tente novamente.',
};
