import { environment } from '../environments/environment';
import * as request from './requster';

const baseUrl = environment.apiAppUrl;
const commentEndPoint = `${baseUrl}/comment`;

export const getAllCommentsByArticle = async (articleId) => {
  return await request.get(
    `${commentEndPoint}?query={"articleId":"${articleId}"}&sort={"likes.length": -1}`
  );
};

export const addComment = async (commentData) => {
  return await request.post(commentEndPoint, commentData);
};

export const getCommentById = async (commentId) => {
  return await request.get(`${commentEndPoint}/${commentId}`);
};

export const editComment = async (commentId, commentData) => {
  return await request.put(`${commentEndPoint}/${commentId}`, commentData);
};

export const deleteComment = async (commentId) => {
  return await request.del(`${commentEndPoint}/${commentId}`, {});
};

export const deleteAllCommentsByArticle = async (articleId) => {
  return await request.del(
    `${commentEndPoint}?query={"articleId":"${articleId}"}`,
    {}
  );
};
