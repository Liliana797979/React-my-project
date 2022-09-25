import { appKey } from '../kinvey.tokens';

export const environment = {
  production: false,
  apiUserUrl: `https://baas.kinvey.com/user/${appKey}`,
  apiAppUrl: `https://baas.kinvey.com/appdata/${appKey}`
};