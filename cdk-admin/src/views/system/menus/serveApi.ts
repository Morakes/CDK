import axios from 'axios';

export const getMenuList = () => {
  return axios.get('/mock/get-menu').then((res) => {
    return res.data;
  });
};
