import { environment } from '../environments/environment';
import * as request from './requster';

const baseUrl = environment.apiUserUrl;

export const getAllUsers = async () => {
  return await request.get(baseUrl);
}

export const suspendUser = async (profileId) => {
  return await request.del(`${baseUrl}/${profileId}?soft=true`, {});
};

export const restoreUser = async (profileId) => {
   return await request.post(`${baseUrl}/${profileId}/_restore`, {});
};
