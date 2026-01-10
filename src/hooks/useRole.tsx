import { UserRole } from '@/types';
import { getAuth } from '@/utils';

export const useRole = () => {
  const user = getAuth();
  const role = user?.role as UserRole;

  return {
    role,
    isBranch: role === UserRole.Branch,
    isStaff: role === UserRole.Staff,
    isSupervisor: role === UserRole.Supervisor,
    hasRole: (roles: UserRole[]) => roles.includes(role),
  };
};
