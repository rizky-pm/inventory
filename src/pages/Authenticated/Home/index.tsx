import SectionWrapper from '@/components/SectionWrapper';
import AdminHomePage from './admin';
import BranchHomePage from './branch';

const HomePage = () => {
  return (
    <SectionWrapper>
      <BranchHomePage />
      {/* <AdminHomePage /> */}
    </SectionWrapper>
  );
};

export default HomePage;
