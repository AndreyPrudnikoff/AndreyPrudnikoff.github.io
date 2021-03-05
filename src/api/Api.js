import axios from "axios";

let BaseApi = axios.create({baseURL: 'https://bitcybets.com/api'});
// let BaseApi = axios.create();

let DevApi = axios.create({baseURL: 'https://dev.bitcybets.com/api'})
export let Api = function() {

  return BaseApi;
};

export let Dev = function() {
  return DevApi;
}

// export default Api;
