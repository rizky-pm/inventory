import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ConfirmationDialog } from '@/components/Dialog';
import PickupSchedulePicker from '@/components/PickupSchedulePicker';
import { Textarea } from '@/components/ui/textarea';
import { UserRole, type IRequest } from '@/types';
import History from '../History';
import { useMemo, useState, type SetStateAction } from 'react';
import { Separator } from '@/components/ui/separator';
import {
  TypographyH4,
  TypographyMuted,
  TypographyP,
} from '@/components/ui/typography';
import dayjs from 'dayjs';
import { File } from 'lucide-react';
import type { UseFormReturn } from 'react-hook-form';
import type { TypeCompleteRequestSchema } from './schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { DATE_FORMAT } from '@/constants';
import { useRole } from '@/hooks/useRole';

export type TStatusHistory = IRequest['status_histories'];

export interface SupervisorRequestUIProps {
  request: IRequest;

  form?: UseFormReturn<TypeCompleteRequestSchema>;
  date: Date | undefined;
  time: string | undefined;
  remarks: string | undefined;
  setRemarks: (v: string | undefined) => void;
  setDate: React.Dispatch<SetStateAction<Date | undefined>>;
  setTime: React.Dispatch<SetStateAction<string | undefined>>;
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;

  onApprove?: () => void;
  onReject?: () => void;
  onComplete?: (values: TypeCompleteRequestSchema) => void;
  isApproving?: boolean;
  isRejecting?: boolean;
  isCompleting?: boolean;
}

const SupervisorRequestUI = ({
  request,
  form,
  date,
  time,
  remarks,
  setRemarks,
  setDate,
  setTime,
  open,
  setOpen,
  onApprove,
  onReject,
  onComplete,
  isApproving,
  isRejecting,
  isCompleting,
}: SupervisorRequestUIProps) => {
  const [isDialogApproveOpen, setIsDialogApproveOpen] = useState(false);
  const [isDialogRejectOpen, setIsDialogRejectOpen] = useState(false);
  const [
    isDialogCompleteConfirmationOpen,
    setIsDialogCompleteConfirmationOpen,
  ] = useState(false);
  const { hasRole } = useRole();

  const isCompleted =
    request.current_status === 'completed' ||
    request.current_status === 'rejected' ||
    request.current_status === 'approved';

  const isReadyToBeCompleted =
    request.current_status === 'approved' &&
    hasRole([UserRole.Staff, UserRole.Supervisor]);

  const pickedUpAt = useMemo(() => {
    if (request.status_histories[0].status === 'completed') {
      return request.status_histories[0].created_at;
    }
  }, [request.status_histories]);

  return (
    <>
      <div className='space-y-4'>
        <div className='space-y-2 border shadow p-4 rounded-lg'>
          <div className='flex justify-between items-center'>
            <TypographyH4>Request Information</TypographyH4>

            <TypographyMuted>
              {dayjs(request.created_at).format(DATE_FORMAT)}
            </TypographyMuted>
          </div>

          <div className='flex justify-between items-center'>
            <div>
              <Label>Pickup Schedule</Label>
              <TypographyP>
                {request.pickup_schedule
                  ? dayjs(request.pickup_schedule).format(DATE_FORMAT)
                  : '-'}
              </TypographyP>
            </div>

            <div className='flex flex-col items-end'>
              <Label>Picked up at</Label>
              <TypographyP>
                {pickedUpAt ? dayjs(pickedUpAt).format(DATE_FORMAT) : '-'}
              </TypographyP>
            </div>
          </div>

          <div>
            <Label>Description</Label>
            <TypographyP>
              {
                request.status_histories[request.status_histories.length - 1]
                  .remark
              }
            </TypographyP>
          </div>

          <div>
            <Label>Attachment</Label>

            {request.status_histories[request.status_histories.length - 1]
              .attachments[0] ? (
              <Button
                variant={'link'}
                className='p-0 underline'
                onClick={() => {
                  window.open(
                    request.status_histories[
                      request.status_histories.length - 1
                    ].attachments[0].url_file
                  );
                }}
              >
                <span>
                  <File />{' '}
                </span>
                View attachment
              </Button>
            ) : (
              '-'
            )}
          </div>

          <TypographyH4>Requested Item(s)</TypographyH4>

          {request.items.map((item) => {
            return (
              <div key={item.id}>
                <div className='py-2 flex justify-between'>
                  <div className='flex flex-col items-start'>
                    <Label>Product Name</Label>
                    <span>{item.product_name}</span>
                  </div>
                  <div className='flex flex-col items-end'>
                    <Label>Qty</Label>
                    <span>{item.quantity}</span>
                  </div>
                </div>

                <Separator />
              </div>
            );
          })}

          <div className='py-4 flex justify-between'>
            <p className='font-semibold'>Total</p>
            <span>
              {request.items.length}{' '}
              {request.items.length > 1 ? 'Items' : 'item'}
            </span>
          </div>

          <div className='flex gap-2'>
            {onApprove && onReject && !isCompleted ? (
              <>
                <Button
                  className='ml-auto'
                  variant='destructive'
                  onClick={() => setIsDialogRejectOpen(true)}
                  disabled={isApproving || isRejecting}
                >
                  Reject
                </Button>

                <Button
                  onClick={() => setIsDialogApproveOpen(true)}
                  disabled={isApproving || isRejecting}
                >
                  Approve
                </Button>
              </>
            ) : null}

            {isReadyToBeCompleted ? (
              <Button
                className='ml-auto'
                onClick={() => {
                  setIsDialogCompleteConfirmationOpen(true);
                }}
              >
                Complete Request
              </Button>
            ) : null}
          </div>
        </div>

        <History history={request.status_histories} />
      </div>

      {onApprove && onReject && !isCompleted ? (
        <>
          <ConfirmationDialog
            isOpen={isDialogApproveOpen}
            setIsOpen={setIsDialogApproveOpen}
            title='Approve'
            description='Are you sure want to approve the request?'
            positiveLabel='Approve'
            onPositive={onApprove}
            isLoading={isApproving}
          >
            <div className='space-y-2'>
              <PickupSchedulePicker
                open={open}
                setOpen={setOpen}
                date={date}
                setDate={setDate}
                time={time}
                setTime={setTime}
              />

              <Textarea
                id='remarks'
                placeholder='Remarks...'
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </div>
          </ConfirmationDialog>

          <ConfirmationDialog
            isOpen={isDialogRejectOpen}
            setIsOpen={setIsDialogRejectOpen}
            title='Reject'
            description='Are you sure want to reject the request?'
            positiveLabel='Reject'
            onPositive={onReject}
            isLoading={isRejecting}
          >
            <Textarea
              id='remarks'
              placeholder='Remarks...'
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </ConfirmationDialog>
        </>
      ) : null}

      {isReadyToBeCompleted &&
      typeof onComplete === 'function' &&
      typeof form === 'object' ? (
        <ConfirmationDialog
          isOpen={isDialogCompleteConfirmationOpen}
          setIsOpen={setIsDialogCompleteConfirmationOpen}
          title='Complete'
          description='Are you sure want to complete the request?'
          positiveLabel='Complete'
          onPositive={() => {
            onComplete(form.getValues());
          }}
          isLoading={isCompleting}
          footer={false}
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onComplete)}
              className='space-y-4'
            >
              <FormField
                control={form.control}
                name='files'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Document <span className='text-red-600'>*</span>
                    </FormLabel>

                    <FormControl>
                      <Input
                        type='file'
                        onChange={(e) => {
                          const selected = e.target.files;
                          if (!selected) return;
                          field.onChange(selected[0]);
                        }}
                        accept='.pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='remarks'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Remarks</FormLabel>

                    <FormControl>
                      <Textarea placeholder='Remarks...' {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='flex gap-2'>
                <Button
                  variant={'outline'}
                  disabled={isCompleting}
                  className='ml-auto'
                  onClick={() => {
                    setIsDialogCompleteConfirmationOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button type='submit' disabled={isCompleting}>
                  {isCompleting ? (
                    <>
                      <Spinner /> Completing request
                    </>
                  ) : (
                    'Complete'
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </ConfirmationDialog>
      ) : null}
    </>
  );
};

export default SupervisorRequestUI;
