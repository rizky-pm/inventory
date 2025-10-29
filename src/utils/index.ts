import { type IUserAuth } from '@/types';
import dayjs from 'dayjs';

export const checkAuth = () => {
  const currentDateUnix = dayjs();

  const user: IUserAuth = JSON.parse(localStorage.getItem('user') || 'null');

  if (!user || !user.access_token) {
    return false;
  }

  if (dayjs.unix(user.access_token_expired).isBefore(currentDateUnix)) {
    localStorage.removeItem('user');
    return false;
  } else {
    return true;
  }
};

export const getAuth = () => {
  const user: IUserAuth = JSON.parse(localStorage.getItem('user') || 'null');

  return user;
};
