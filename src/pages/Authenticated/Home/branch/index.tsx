import SectionWrapper from '@/components/SectionWrapper';
import { TypographyH3 } from '@/components/ui/typography';

import EmptyData from '@/assets/illustrations/empty-data.svg';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGetRequests } from '@/services/useRequest';
import { useEffect, useState } from 'react';
import RequestTable from '@/components/RequestTable';

const BranchHomePage = () => {
  const navigate = useNavigate();

  const [pagination, setPagination] = useState<{
    pageIndex: number;
    pageSize: number;
  }>({
    pageIndex: 1,
    pageSize: 10,
  });

  const {
    data: requestsData,
    isLoading,
    isSuccess,
    refetch,
  } = useGetRequests({
    page: pagination.pageIndex,
    size: pagination.pageSize,
  });

  useEffect(() => {
    if (pagination.pageIndex > 1) {
      refetch();
    }
  }, [pagination, refetch]);

  console.log(requestsData);

  return (
    <>
      <SectionWrapper className='py-0 px-0'>
        {requestsData?.data.length ? (
          isSuccess && (
            <RequestTable
              pagination={pagination}
              setPagination={setPagination}
              requestData={requestsData}
              isLoading={isLoading}
              isSuccess={isSuccess}
            />
          )
        ) : (
          <div className='h-[calc(100vh-4.5vh)] w-[calc(100%+8.333333%)] text-center flex flex-col justify-center items-center'>
            <img
              src={EmptyData}
              alt='Empty data illustration'
              className='w-20 h-20'
            />
            <TypographyH3>No active requests</TypographyH3>
            <p>You don’t have any active requests at the moment.</p>
            <Button
              variant={'secondary'}
              className='mt-4'
              onClick={() => {
                navigate('/requests');
              }}
            >
              <Plus />
              Create Request
            </Button>
          </div>
        )}
      </SectionWrapper>
    </>
  );
};

export default BranchHomePage;
