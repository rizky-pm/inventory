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
import { useDeleteProduct } from '@/services/useProduct';
import { useQueryClient } from '@tanstack/react-query';
import type { SetStateAction } from 'react';
import { toast } from 'sonner';

interface Props {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<SetStateAction<boolean>>;
  productId: string;
  productName: string;
}

export function DeleteProductDialog(props: Props) {
  const { isDialogOpen, setIsDialogOpen, productId, productName } = props;
  const queryClient = useQueryClient();

  const { mutate, isPending } = useDeleteProduct();

  const onDelete = () => {
    mutate(
      { id: productId },
      {
        onSuccess: async () => {
          setIsDialogOpen(false);
          await queryClient.invalidateQueries({
            queryKey: ['product.get-products'],
          });

          toast.success(`Success delete ${productName}.`);
        },

        onError: (error) => {
          console.error(error);
          toast.error(
            'Something went wrong while adding new product, please try again later.'
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
          <DialogTitle>Delete Product</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {productName}? This action cannot be
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
