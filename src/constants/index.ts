import { UserRole, type IMenu } from '@/types';

export const IS_AUTHENTICATED = false;

export const MENU: IMenu[] = [
  {
    route: '/',
    label: 'Home',
    roles: [UserRole.Branch, UserRole.Staff, UserRole.Supervisor],
  },

  {
    route: '/products',
    label: 'Products',
    roles: [UserRole.Staff, UserRole.Supervisor, UserRole.Branch],
  },
  // {
  //   route: '/accounts',
  //   label: 'Accounts',
  //   roles: [UserRole.SuperVisor],
  // },
  {
    route: '/branches',
    label: 'Branches',
    roles: [UserRole.Supervisor],
  },
];

export const DATE_FORMAT = 'dddd, DD MMMM YYYY';
