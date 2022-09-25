import { environment } from '../environments/environment';
import * as request from './requster';

const baseUrl = environment.apiAppUrl;
const articleEndPoint = `${baseUrl}/article`;

export const createArticle = async (articleData) => {
  return await request.post(articleEndPoint, articleData);
};

export const getAllArticles = async () => {
  return await request.get(`${articleEndPoint}?query={}&sort={"_kmd.ect": -1}`);
};

export const getUserArticles = async (user) => {
  return await request.get(`${articleEndPoint}?query={"author":"${user}"}&sort={"_kmd.ect": -1}`);
};

export const getArticleById = async (articleId) => {
  return await request.get(`${articleEndPoint}/${articleId}`);
};

export const editArticle = async (body, articleId) => {
  return await request.put(`${articleEndPoint}/${articleId}`, body);
};

export const deleteArticle = async (articleId) => {
  return await request.del(`${articleEndPoint}/${articleId}`, {});
};
