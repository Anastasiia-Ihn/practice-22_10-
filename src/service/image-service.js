import axios from 'axios';

const API_KEY = 'j7JF1BTBlXSxQGfmW8QRbhkr1xCSFHFvAx58vTwLLX3htFlGIIKtnydS';
axios.defaults.baseURL = 'https://api.pexels.com/v1/';
axios.defaults.headers.common['Authorization'] = API_KEY;
axios.defaults.params = {
  orientation: 'landscape',
  per_page: 15,
};

export const getImages = async (query, page) => {
  try {
    const resp = await axios.get(`search?query=${query}&page=${page}`);
    return resp.data
  } catch (error) {
    throw new Error(error.message)
  }
};
