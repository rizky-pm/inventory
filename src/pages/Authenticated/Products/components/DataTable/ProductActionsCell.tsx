import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { IProduct } from '@/types';
import AddProductDialog from '../AddProductDialog';
import { useState } from 'react';
import { DeleteProductDialog } from '../DeleteDialog';

const ProductActionsCell = (props: { product: IProduct | undefined }) => {
  const { product } = props;

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

      <AddProductDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        product={product}
      />

      {product ? (
        <DeleteProductDialog
          isDialogOpen={isDialogDeleteOpen}
          setIsDialogOpen={setIsDialogDeleteOpen}
          productId={product.id}
          productName={product.name}
        />
      ) : null}
    </>
  );
};

export default ProductActionsCell;
