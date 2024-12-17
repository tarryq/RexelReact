import { accounts } from '../../data-schemas/accountsData';

export const fetchAccounts = () => {
 return new Promise((resolve) => {
  // Simulate API call
  resolve(accounts);
 });
};

export const updateAccount = (accountData) => {
 return new Promise((resolve) => {
  const updatedAccounts = accounts.map(acc =>
   acc.account === accountData.account
    ? { ...acc, ...accountData }
    : acc
  );
  resolve(updatedAccounts);
 });
};