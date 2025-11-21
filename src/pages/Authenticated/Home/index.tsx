import SectionWrapper from '@/components/SectionWrapper';
import AdminHomePage from './admin';
import BranchHomePage from './branch';
import { useRole } from '@/hooks/useRole';
import type { UserRole } from '@/types';

const renderHomePage = (role: UserRole) => {
  switch (role) {
    case 'branch':
      return <BranchHomePage />;

    case 'supervisor':
      return <AdminHomePage />;

    default:
      return;
  }
};

const HomePage = () => {
  const { role } = useRole();

  return <SectionWrapper>{renderHomePage(role)}</SectionWrapper>;
};

export default HomePage;
