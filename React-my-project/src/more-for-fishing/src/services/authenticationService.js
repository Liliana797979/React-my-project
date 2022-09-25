import { environment } from '../environments/environment';
import * as request from './requster';

const baseUrl = environment.apiUserUrl;

export const register = async (userData) => {
  return await request.post(baseUrl, userData);
};

export const login = async (userData) => {
  return await request.post(`${baseUrl}/login`, userData);
};

export const logout = async () => {
  return await request.post(`${baseUrl}/_logout`, {});
};