import { environment } from '../environments/environment';
import * as request from './requster';

const baseUrl = environment.apiUserUrl;

export const getUser = async (profileId) => {
  return await request.get(`${baseUrl}/${profileId}`);
};

export const updateUser = async (profileId, user) => {
  return await request.put(`${baseUrl}/${profileId}`, user);
};

export const deleteUser = async (profileId) => {
  return await request.del(`${baseUrl}/${profileId}?hard=true`, {});
};