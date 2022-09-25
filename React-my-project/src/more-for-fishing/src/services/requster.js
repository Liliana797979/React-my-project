import { appKey, appSecret, appMasterSecret } from '../kinvey.tokens';
import { Buffer } from 'buffer';

const request = async (method, url, data) => {
  try {
    const user = localStorage.getItem('auth');
    const auth = JSON.parse(user || '{}');

    let headers = {};
    if (url.endsWith('login') || (url.endsWith(appKey) && method === 'POST')) {
      headers['Authorization'] = `Basic ${Buffer.from(
        `${appKey}:${appSecret}`
      ).toString('base64')}`;
    } else if (url.endsWith('_restore')) {
      headers['Authorization'] = `Basic ${Buffer.from(
        `${appKey}:${appMasterSecret}`
      ).toString('base64')}`;
    } else {
      headers['Authorization'] = `Kinvey ${auth.accessToken}`;
    }

    let buildRequest;

    if (method === 'GET') {
      buildRequest = fetch(url, { headers });
    } else {
      buildRequest = fetch(url, {
        method,
        headers: {
          ...headers,
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    }

    const response = await buildRequest;

    if (url.endsWith('_logout') && response.ok) {
      localStorage.clear();
      return;
    }

    if (response.ok) {
      if (response.status === 204) {
        return;
      }
      return await response.json();
    } else {
      const result = await response.json();
      throw result.description;
    }
    
  } catch (error) {
    throw error;
  }
};

export const get = request.bind({}, 'GET');
export const post = request.bind({}, 'POST');
export const patch = request.bind({}, 'PATCH');
export const put = request.bind({}, 'PUT');
export const del = request.bind({}, 'DELETE');
