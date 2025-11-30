import SectionWrapper from '@/components/SectionWrapper';
import { useNavigate } from 'react-router-dom';
import { getAuth } from '@/utils';
import { useEffect, useState } from 'react';
import { useGetRequests, useGetSummary } from '@/services/useRequest';
import { TypographyH3 } from '@/components/ui/typography';
import { cn } from '@/lib/utils';
import RequestTable from '@/components/RequestTable';
import { Button } from '@/components/ui/button';
import EmptyData from '@/assets/illustrations/empty-data.svg';
import { Plus } from 'lucide-react';

const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => {
  return (
    <div
      className={cn(
        'w-56 h-56 bg-gray-300 p-4 flex flex-col justify-between rounded-xl',
        className
      )}
    >
      {children}
    </div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const { username, branch } = getAuth();
  console.log(branch);

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

  const { data: summaryData, isLoading: isLoadingSummary } = useGetSummary();

  useEffect(() => {
    if (pagination.pageIndex > 1) {
      refetch();
    }
  }, [pagination, refetch]);

  return (
    <SectionWrapper>
      <div className='flex justify-between items-center'>
        <TypographyH3>Hi, {username}</TypographyH3>

        {branch && <span>{branch.name}</span>}
      </div>
      <div
        className={cn(
          ' flex flex-col items-center mt-4',
          requestsData?.data.length ? 'gap-4' : 'gap-32'
        )}
      >
        {!isLoadingSummary ? (
          <div className='flex w-full justify-between'>
            <Card className='bg-blue-100'>
              <span className='font-bold text-xl text-left'>Total Request</span>
              <span className='font-bold text-7xl text-right'>
                {summaryData?.data.total_approved}
              </span>
            </Card>
            <Card className='bg-yellow-100'>
              <span className='font-bold text-xl text-left'>
                Request in Progress
              </span>
              <span className='font-bold text-7xl text-right'>
                {summaryData?.data.total_pending}
              </span>
            </Card>

            <Card className='bg-red-100'>
              <span className='font-bold text-xl text-left'>
                Request Rejected
              </span>
              <span className='font-bold text-7xl text-right'>
                {summaryData?.data.total_rejected}
              </span>
            </Card>

            <Card className='bg-green-100'>
              <span className='font-bold text-xl text-left'>
                Request Completed
              </span>
              <span className='font-bold text-7xl text-right'>
                {summaryData?.data.total_completed}
              </span>
            </Card>
          </div>
        ) : (
          <p>Loading summary ...</p>
        )}
        {requestsData?.data.length ? (
          isSuccess && (
            <div className='w-full flex flex-col'>
              <Button
                className='ml-auto'
                onClick={() => {
                  navigate('/products');
                }}
              >
                <Plus />
                Create new request
              </Button>
              <RequestTable
                pagination={pagination}
                setPagination={setPagination}
                requestData={requestsData}
                isLoading={isLoading}
                isSuccess={isSuccess}
              />
            </div>
          )
        ) : (
          <div className='h-full w-full flex flex-col justify-center items-center'>
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
                navigate('/products');
              }}
            >
              <Plus />
              Create Request
            </Button>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
};

export default HomePage;
