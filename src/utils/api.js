import axios from 'axios';

export const get = async (url, token) => {
  console.log('url: ', url);

  const value = await axios
    .get(url, {
      params: {
        token,
      },
    })
    .then(response => {
      console.log('GET-response: ', response);

      return response && response.data;
    })
    .catch(error => {
      console.log('GET-error: ', error);
      return error;
    });
  return value;
};

export const create = async (url, body, token) => {
  const value = await axios
    .post(url, body, {
      params: {
        token,
      },
    })
    .then(response => {
      console.log('POST-response: ', response);
      return response && response.data && response.data;
    })
    .catch(error => {
      console.log('POST-error: ', error);
      return error;
    });
  return value;
};

export const update = (url, token) => {
  return `Updating ${url}, authenticating with ${token}`;
};

export const remove = async (url, token) => {
  const value = await axios
    .delete(url)
    .then(response => {
      console.log('DELETE-response: ', response);
      return response && response.data && response.data;
    })
    .catch(error => {
      console.log('DELETE-error: ', error);
      return error;
    });
  return value;
};
