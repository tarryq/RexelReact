import axios from 'axios';

const BASE_URL = 'https://srms-b8gygwe8fuawdfh7.canadacentral-01.azurewebsites.net/api/account';

const getAccounts = async (userId) => {
  const response = await axios.get(`${BASE_URL}/GetAccountsByUserId?userId=${userId}`);
  return response.data;
};

const getStores = async (userId, accountId) => {
  const response = await axios.get(`${BASE_URL}/GetStoresForUser?userId=${userId}&accountId=${accountId}`);
  return response.data;
};

const getProductColumns = async (userId, accountId) => {
  const response = await axios.get(`${BASE_URL}/ReturnAccountGridColumns?accountid=${accountId}&userid=${userId}`);
  return response.data;
};

const getProducts = async (userId, accountId, storeId) => {
  const response = await axios.get(`${BASE_URL}/ReturnAccountStoreProducts?accountid=${accountId}&storeid=${storeId}&userid=${userId}`);
  return response.data;
};


export default {
  getAccounts,
  getStores,
  getProductColumns,
  getProducts,
};
