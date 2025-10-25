import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/spinner';
import { useDeleteBranch } from '@/services/useBranch';
import { useQueryClient } from '@tanstack/react-query';
import type { SetStateAction } from 'react';
import { toast } from 'sonner';

interface Props {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<SetStateAction<boolean>>;
  branchId: string;
  branchName: string;
}

export function DeleteBranchDialog(props: Props) {
  const { isDialogOpen, setIsDialogOpen, branchId, branchName } = props;
  const queryClient = useQueryClient();

  const { mutate, isPending } = useDeleteBranch();

  const onDelete = () => {
    mutate(
      { id: branchId },
      {
        onSuccess: async () => {
          setIsDialogOpen(false);
          await queryClient.invalidateQueries({
            queryKey: ['branch.get-branches'],
          });

          toast.success(`Success delete ${branchName}.`);
        },

        onError: (error) => {
          console.error(error);
          toast.error(
            'Something went wrong while deleting branch, please try again later.'
          );
        },
      }
    );
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setIsDialogOpen(isOpen);
        }
      }}
    >
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Delete Branch</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {branchName}? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline' disabled={isPending}>
              Cancel
            </Button>
          </DialogClose>
          <Button type='submit' disabled={isPending} onClick={onDelete}>
            {isPending ? <Spinner /> : null}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
