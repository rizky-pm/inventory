import { useState } from 'react';
import {
  useSearchParams,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { useCartStore } from '@/stores/useCartStore';
import { createRequestSchema, type TypeCreateRequestSchema } from './schema';
import {
  useApproveRequest,
  useCompleteRequest,
  useCreateNewRequest,
  useRejectRequest,
} from '@/services/useRequest';
import CreateRequestUI from './components/CreateRequestUI';
import SupervisorRequestUI from './components/SupervisorRequestUI';
import { toast } from 'sonner';
import axios from 'axios';
import SectionWrapper from '@/components/SectionWrapper';
import { TypographyH3 } from '@/components/ui/typography';
import { useRole } from '@/hooks/useRole';
import { UserRole } from '@/types';
import _ from 'lodash';
import { Badge } from '@/components/ui/badge';
import {
  completeRequestSchema,
  type TypeCompleteRequestSchema,
} from './components/SupervisorRequestUI/schema';
import { zodResolver } from '@hookform/resolvers/zod';

const RequestDetailPage = () => {
  const [searchParams] = useSearchParams();
  const requestCode = searchParams.get('request-code');
  const location = useLocation();
  const navigate = useNavigate();
  const { hasRole } = useRole();

  const isBranchRole = hasRole([UserRole.Branch]);
  const isNonBranchRole = hasRole([UserRole.Supervisor, UserRole.Staff]);

  const { products, total, clearCart } = useCartStore();

  const createRequestForm = useForm<TypeCreateRequestSchema>({
    resolver: zodResolver(createRequestSchema),
    defaultValues: {
      files: undefined,
      remarks: '',
    },
  });

  const completeRequestForm = useForm<TypeCompleteRequestSchema>({
    resolver: zodResolver(completeRequestSchema),
    defaultValues: {
      files: undefined,
      remarks: '',
    },
  });

  const { mutateAsync: createRequest, isPending: isCreating } =
    useCreateNewRequest();
  const { mutateAsync: approveRequest, isPending: isApproving } =
    useApproveRequest();
  const { mutateAsync: rejectRequest, isPending: isRejecting } =
    useRejectRequest();
  const { mutateAsync: completeRequest, isPending: isCompleting } =
    useCompleteRequest();

  const [remarks, setRemarks] = useState<string | undefined>();
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string | undefined>();
  const [open, setOpen] = useState<boolean>(false);

  const requestDetail = location.state?.request;

  if (isNonBranchRole && !location.state) {
    return <Navigate to='/' replace />;
  }

  const handleCreateRequest = (values: TypeCreateRequestSchema) => {
    const payload = { ...values, files: [values.files], items: products };
    createRequest(payload, {
      onSuccess: () => {
        toast.success('Success create request', {
          onAutoClose: () => {
            navigate('/');
            clearCart();
            localStorage.removeItem('cart-storage');
          },
        });
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          console.log(error.response?.data.message);
          toast.error(
            <div>
              {' '}
              {error.response?.data.message.map(
                (item: Record<string, string>) => (
                  <div key={item.product_id}>{item.details}</div>
                )
              )}{' '}
            </div>
          );
        }
      },
    });
  };

  const handleApprove = () => {
    if (!time || !requestDetail.id) {
      return;
    }
    const merged = dayjs(date)
      .hour(Number(time.split(':')[0]))
      .minute(Number(time.split(':')[1]))
      .second(0)
      .millisecond(0);
    const pickup_schedule = merged.toDate().toISOString();
    const payload = { remarks, id: requestDetail.id, pickup_schedule };
    approveRequest(payload, {
      onSuccess: () => {
        toast.success('Request has been approved', {
          onAutoClose: () => {
            navigate('/');
          },
        });
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          console.log(error.response?.data.message);
          toast.error('Failed approving request');
        }
      },
    });
  };

  const handleReject = () => {
    rejectRequest(
      { remarks, id: requestDetail.id! },
      {
        onSuccess: () => {
          toast.success('Request has been rejected', {
            onAutoClose: () => {
              navigate('/');
            },
          });
        },
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            console.log(error.response?.data.message);
            toast.error('Failed rejecting request');
          }
        },
      }
    );
  };

  const handleComplete = (values: TypeCompleteRequestSchema) => {
    const payload = {
      ...values,
      files: [values.files],
      id: requestDetail.id,
    };

    completeRequest(payload, {
      onSuccess: () => {
        toast.success('Request has been completed', {
          onAutoClose: () => {
            navigate('/');
          },
        });
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          console.log(error.response?.data.message);
          toast.error('Failed completing request');
        }
      },
    });
  };

  return (
    <SectionWrapper className='px-32'>
      <div className='flex justify-between items-center'>
        <div>
          <TypographyH3>Request {_.capitalize(requestCode!)}</TypographyH3>
          {requestDetail ? (
            <span>Created by {requestDetail.created_by}</span>
          ) : null}
        </div>
        {requestDetail ? (
          <Badge className='capitalize' variant={requestDetail.current_status}>
            {requestDetail.current_status}
          </Badge>
        ) : null}
      </div>

      <div className='w-full flex flex-col justify-center items-center mt-4'>
        <div className='w-full flex flex-col gap-4'>
          <div>
            {/* CREATE MODE (Branch User) */}
            {isBranchRole && !requestCode && (
              <CreateRequestUI
                form={createRequestForm}
                products={products}
                total={total}
                isPending={isCreating}
                onCreateRequest={handleCreateRequest}
              />
            )}

            {/* BRANCH – VIEW EXISTING REQUEST */}
            {isBranchRole && requestCode && location?.state?.request && (
              <SupervisorRequestUI
                request={requestDetail}
                date={date}
                time={time}
                remarks={remarks}
                setDate={setDate}
                setTime={setTime}
                setRemarks={setRemarks}
                open={open}
                setOpen={setOpen}
                isApproving={isApproving}
                isRejecting={isRejecting}
              />
            )}

            {/* VIEW MODE (Supervisor / Staff) */}
            {isNonBranchRole && (
              <SupervisorRequestUI
                request={requestDetail}
                form={completeRequestForm}
                // dialog state
                // approve state
                date={date}
                time={time}
                remarks={remarks}
                setDate={setDate}
                setTime={setTime}
                setRemarks={setRemarks}
                open={open}
                setOpen={setOpen}
                // actions
                onApprove={handleApprove}
                onReject={handleReject}
                onComplete={handleComplete}
                isApproving={isApproving}
                isRejecting={isRejecting}
                isCompleting={isCompleting}
              />
            )}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default RequestDetailPage;
