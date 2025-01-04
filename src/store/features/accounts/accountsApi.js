import axios from 'axios'

const BASE_URL =
  'https://srms-b8gygwe8fuawdfh7.canadacentral-01.azurewebsites.net/api/account'

export const getAccounts = async (userId) => {
  const response = await axios.get(
    `${BASE_URL}/GetAccountsByUserId?userId=${userId}`
  )
  return response.data
}

export const getStores = async (userId, accountId) => {
  const response = await axios.get(
    `${BASE_URL}/GetStoresForUser?userId=${userId}&accountId=${accountId}`
  )
  return response.data
}

