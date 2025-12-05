// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
import { SquareArrowOutUpRight } from 'lucide-react';
// import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type IRequest } from '@/types';
// import { UserRole } from '@/types';
// import { useState } from 'react';
// import { useRole } from '@/hooks/useRole';
import { useNavigate } from 'react-router-dom';
// import { ConfirmationDialog } from '@/components/Dialog';

const RequestActionsCell = (props: { request: IRequest | undefined }) => {
  const { request } = props;
  // const { hasRole } = useRole();
  const navigate = useNavigate();

  // const [isDialogRejectConfirmationOpen, setIsDialogRejectConfirmationOpen] =
  //   useState(false);
  // const [isDialogApproveConfirmationOpen, setIsDialogApproveConfirmationOpen] =
  //   useState(false);

  // const onClickApproveRequest = () => {
  //   console.log('Approve');
  // };

  // const onClickRejectRequest = () => {
  //   console.log('Reject');
  // };

  const onClickViewDetail = () => {
    navigate(`/requests/detail?request-code=${request?.code}`, {
      state: {
        request,
      },
    });
  };

  return (
    <div className='flex justify-end'>
      <Button size={'icon'} variant={'ghost'} onClick={onClickViewDetail}>
        <SquareArrowOutUpRight />
      </Button>
      {/* <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          {hasRole([
            UserRole.Branch,
            UserRole.Staff,
            UserRole.SuperAdmin,
            UserRole.Supervisor,
          ]) && (
            <DropdownMenuLabel
              onClick={() => {
                navigate(`/requests/detail?request-code=${request?.code}`);
              }}
            >
              View details
            </DropdownMenuLabel>
          )}
        </DropdownMenuContent>
      </DropdownMenu> */}

      {/* <ConfirmationDialog
        isOpen={isDialogApproveConfirmationOpen}
        setIsOpen={setIsDialogApproveConfirmationOpen}
        title='Approve'
        description='Are you sure want to approve the request?'
        negativeLabel='Cancel'
        positiveLabel='Approve'
        onPositive={onClickApproveRequest}
      />

      <ConfirmationDialog
        isOpen={isDialogRejectConfirmationOpen}
        setIsOpen={setIsDialogRejectConfirmationOpen}
        title='Reject'
        description='Are you sure want to reject the request?'
        negativeLabel='Cancel'
        positiveLabel='Reject'
        onPositive={onClickRejectRequest}
      /> */}
    </div>
  );
};

export default RequestActionsCell;
