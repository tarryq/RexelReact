import axios from 'axios';

const BASE_URL = 'https://srms-b8gygwe8fuawdfh7.canadacentral-01.azurewebsites.net/api/account';

export const getAccounts = async (userId) => {
  const response = await axios.get(`${BASE_URL}/GetAccountsByUserId?userId=${userId}`);
  return response.data;
};

export const getStores = async (userId, accountId) => {
  const response = await axios.get(`${BASE_URL}/GetStoresForUser?userId=${userId}&accountId=${accountId}`);
  return response.data;
};

export const getAccountMaintenance = async (accountId) => {
  const response = await axios.get(`${BASE_URL}/GetAccountMaintenance?accountId=${accountId}`);
  return response.data;
};

export const getAccountLocations = async (accountId, userId, langId) => {
  const response = await axios.get(`${BASE_URL}/GetAccountLocations?acctId=${accountId}&langId=${langId}&userId=${userId}`);
  return response.data;
};

export const getAccountLocationProducts = async (accountId, locationId, langId, userId) => {
  const response = await axios.get(`${BASE_URL}/GetAccountLocationProducts?acctId=${accountId}&locationId=${locationId}&langId=${langId}&userId=${userId}`);
  return response.data;
};
