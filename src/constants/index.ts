import { UserRole, type IMenu } from '@/types';

export const IS_AUTHENTICATED = false;

export const MENU: IMenu[] = [
  {
    route: '/',
    label: 'Home',
    roles: [
      UserRole.Branch,
      UserRole.Staff,
      UserRole.SuperAdmin,
      UserRole.Supervisor,
    ],
  },

  {
    route: '/products',
    label: 'Products',
    roles: [
      UserRole.SuperAdmin,
      UserRole.Staff,
      UserRole.Supervisor,
      UserRole.Branch,
    ],
  },

  {
    route: '/accounts',
    label: 'Accounts',
    roles: [UserRole.SuperAdmin],
  },
  {
    route: '/branches',
    label: 'Branches',
    roles: [UserRole.SuperAdmin, UserRole.Supervisor],
  },
];

export const DATE_FORMAT = 'dddd, DD MMMM YYYY';
