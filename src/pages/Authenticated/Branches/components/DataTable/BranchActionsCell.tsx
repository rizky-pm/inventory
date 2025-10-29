import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { IBranch } from '@/types';
import { useState } from 'react';
import AddBranchDialog from '../AddBranchDialog';
import { DeleteBranchDialog } from '../DeleteBranchDialog';

const BranchActionsCell = (props: { branch: IBranch | undefined }) => {
  const { branch } = props;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel
            onClick={() => {
              setIsDialogOpen(true);
            }}
          >
            Edit
          </DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              setIsDialogDeleteOpen(true);
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AddBranchDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        branch={branch}
      />

      {branch ? (
        <DeleteBranchDialog
          isDialogOpen={isDialogDeleteOpen}
          setIsDialogOpen={setIsDialogDeleteOpen}
          branchId={branch.id}
          branchName={branch.name}
        />
      ) : null}
    </>
  );
};

export default BranchActionsCell;
