import SectionWrapper from '@/components/SectionWrapper';
import { useNavigate } from 'react-router-dom';
import { getAuth } from '@/utils';
import { useEffect, useState } from 'react';
import { useGetRequests, useGetSummary } from '@/services/useRequest';
import { TypographyH3, TypographyP } from '@/components/ui/typography';
import { cn } from '@/lib/utils';
import RequestTable from '@/components/RequestTable';
import { Button } from '@/components/ui/button';
import EmptyData from '@/assets/illustrations/empty-data.svg';
import { Check, CheckCheck, Clock3, Files, Plus, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import {
  searchRequestSchema,
  type SearchRequestType,
} from '@/components/RequestTable/SearchRequest/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import SearchRequest from '@/components/RequestTable/SearchRequest';

const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'w-1/4 shadow p-4 flex items-center justify-between rounded-lg',
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

  const [pagination, setPagination] = useState<{
    pageIndex: number;
    pageSize: number;
  }>({
    pageIndex: 1,
    pageSize: 10,
  });

  const form = useForm<SearchRequestType>({
    resolver: zodResolver(searchRequestSchema),
    defaultValues: {
      requestCode: '',
    },
  });

  const {
    data: requestsData,
    isLoading,
    isSuccess,
    refetch,
  } = useGetRequests({
    page: pagination.pageIndex,
    size: pagination.pageSize,
    search: form.getValues('requestCode'),
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
          <div className='flex w-full justify-between gap-4'>
            <Card>
              <div className='flex flex-col'>
                <TypographyP>Total Request</TypographyP>
                <span className='font-bold text-2xl'>
                  {summaryData?.data.total_request}
                </span>
              </div>
              <div className='w-10 h-10 bg-gray-200 rounded-lg flex justify-center items-center'>
                <Files className='w-5 h-5 text-gray-700' />
              </div>
            </Card>
            <Card>
              <div className='flex flex-col'>
                <TypographyP>In Progress</TypographyP>
                <span className='font-bold text-2xl'>
                  {summaryData?.data.total_pending}
                </span>
              </div>
              <div className='w-10 h-10 bg-yellow-200 rounded-lg flex justify-center items-center'>
                <Clock3 className='w-5 h-5 text-yellow-700' />
              </div>
            </Card>

            <Card>
              <div className='flex flex-col'>
                <TypographyP>Approved</TypographyP>
                <span className='font-bold text-2xl'>
                  {summaryData?.data.total_approved}
                </span>
              </div>
              <div className='w-10 h-10 bg-blue-200 rounded-lg flex justify-center items-center'>
                <Check className='w-5 h-5 text-blue-700' />
              </div>
            </Card>

            <Card>
              <div className='flex flex-col'>
                <TypographyP>Rejected</TypographyP>
                <span className='font-bold text-2xl'>
                  {summaryData?.data.total_approved}
                </span>
              </div>
              <div className='w-10 h-10 bg-red-200 rounded-lg flex justify-center items-center'>
                <X className='w-5 h-5 text-red-700' />
              </div>
            </Card>

            <Card>
              <div className='flex flex-col'>
                <TypographyP>Completed</TypographyP>
                <span className='font-bold text-2xl'>
                  {summaryData?.data.total_completed}
                </span>
              </div>
              <div className='w-10 h-10 bg-green-200 rounded-lg flex justify-center items-center'>
                <CheckCheck className='w-5 h-5 text-green-700' />
              </div>
            </Card>
          </div>
        ) : (
          <p>Loading summary ...</p>
        )}
        {requestsData?.data.length ? (
          isSuccess && (
            <div className='w-full flex flex-col'>
              <div className='flex justify-between items-center'>
                <SearchRequest form={form} refetch={refetch} />

                <Button
                  className='ml-auto'
                  onClick={() => {
                    navigate('/products');
                  }}
                >
                  <Plus />
                  Create new request
                </Button>
              </div>
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
