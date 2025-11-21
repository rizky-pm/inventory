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
import { useCartStore } from '@/stores/useCartStore';
import type { IProduct } from '@/types';
import type { SetStateAction } from 'react';

interface Props {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<SetStateAction<boolean>>;
  product: IProduct;
}

const RequestConfirmationDialog = (props: Props) => {
  const { isDialogOpen, product, setIsDialogOpen } = props;

  const { addProduct } = useCartStore();

  const onClickAddItem = () => {
    const productToCart = {
      ...product,
      qty: 1,
    };
    addProduct(productToCart);
    setIsDialogOpen(false);
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
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Quantity Exceeds Available Stock</DialogTitle>
          <DialogDescription>
            The requested quantity for <strong>{product.name}</strong> exceeds
            the available stock. You can still proceed, but it may take longer
            to fulfill.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <Button type='submit' onClick={onClickAddItem}>
            Add item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RequestConfirmationDialog;
