import SectionWrapper from '@/components/SectionWrapper';
import { TypographyH3 } from '@/components/ui/typography';

import EmptyData from '@/assets/illustrations/empty-data.svg';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGetRequests } from '@/services/useRequest';
import { useEffect, useState } from 'react';
import RequestTable from '@/components/RequestTable';
import { getAuth } from '@/utils';
import { cn } from '@/lib/utils';

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

const BranchHomePage = () => {
  const navigate = useNavigate();
  const { username } = getAuth();

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

  console.log(requestsData?.data);

  useEffect(() => {
    if (pagination.pageIndex > 1) {
      refetch();
    }
  }, [pagination, refetch]);

  return (
    <>
      <SectionWrapper className='py-0 px-0'>
        <TypographyH3>Hi, {username}</TypographyH3>
        <div
          className={cn(
            'w-[calc(100%+8.333333%)] flex flex-col items-center mt-4',
            requestsData?.data.length ? 'gap-4' : 'gap-32'
          )}
        >
          <div className='flex w-full justify-between'>
            <Card className='bg-blue-200'>
              <span className='font-bold text-xl text-left'>Total Request</span>
              <span className='font-bold text-7xl text-right'>20</span>
            </Card>
            <Card className='bg-yellow-200'>
              <span className='font-bold text-xl text-left'>
                Request in Progress
              </span>
              <span className='font-bold text-7xl text-right'>10</span>
            </Card>

            <Card className='bg-red-200'>
              <span className='font-bold text-xl text-left'>
                Request Rejected
              </span>
              <span className='font-bold text-7xl text-right'>5</span>
            </Card>

            <Card className='bg-green-200'>
              <span className='font-bold text-xl text-left'>
                Request Completed
              </span>
              <span className='font-bold text-7xl text-right'>5</span>
            </Card>
          </div>
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
    </>
  );
};

export default BranchHomePage;
