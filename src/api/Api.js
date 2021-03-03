import axios from 'axios';

let BaseApi = axios.create({baseURL: 'https://bitcybets.com/api'});
// let BaseApi = axios.create();
let DevApi = axios.create({baseURL: 'https://dev.bitcybets.com/api'});
let Api = function() {
  // let token = localStorage.getItem('token');
  //
  // if (token) {
  //   BaseApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  // } else {
  //   delete BaseApi.defaults.headers.common['Authorization'];
  // }
  return BaseApi;
};

export default Api;
