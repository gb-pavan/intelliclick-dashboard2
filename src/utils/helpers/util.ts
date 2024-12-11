import { Role, StorageKey, Theme } from '@utils/enums';

export const getToken = () => {
  const role = localStorage.getItem(StorageKey.ROLE) || Role.STUDENT;
  const token = localStorage.getItem(`${role}${StorageKey.TOKEN}`);
  return token;
};