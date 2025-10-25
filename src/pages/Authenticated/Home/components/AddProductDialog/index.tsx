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
import { Input } from '@/components/ui/input';
import { useEffect, type SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { addProductSchema, type AddProductType } from './add-product.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useAddNewProduct, useEditProduct } from '@/services/useProduct';
import { Spinner } from '@/components/ui/spinner';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { IProduct } from 'types';
import _ from 'lodash';

interface Props {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<SetStateAction<boolean>>;
  product?: IProduct;
}

const AddProductDialog = (props: Props) => {
  const { isDialogOpen, setIsDialogOpen, product } = props;

  const queryClient = useQueryClient();
  const { mutate: addNewProduct, isPending: isPendingAddNewProduct } =
    useAddNewProduct();
  const { mutate: editProduct, isPending: isPendingEditProduct } =
    useEditProduct();

  const form = useForm<AddProductType>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      name: '',
      description: '',
      sku: '',
      stock: '',
    },
  });

  useEffect(() => {
    if (product) {
      form.setValue('sku', product.sku);
      form.setValue('description', product.description);
      form.setValue('name', product.name);
      form.setValue('stock', _.toString(product.stock));
    }
  }, [product, form]);

  const onSubmit = (values: AddProductType) => {
    if (!product) {
      addNewProduct(values, {
        onSuccess: async () => {
          setIsDialogOpen(false);
          await queryClient.invalidateQueries({
            queryKey: ['product.get-products'],
          });
        },
        onError: (error) => {
          console.error(error);
          toast.error(
            'Something went wrong while adding new product, please try again later.'
          );
        },
      });
    } else {
      const body = {
        ...values,
        id: product.id,
      };
      editProduct(body, {
        onSuccess: async () => {
          setIsDialogOpen(false);
          await queryClient.invalidateQueries({
            queryKey: ['product.get-products'],
          });
        },
        onError: (error) => {
          console.error(error);
          toast.error(
            'Something went wrong while editting product, please try again later.'
          );
        },
      });
    }
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setIsDialogOpen(isOpen);
          form.reset();
        }
      }}
    >
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Fill in the product details below to add a new item to your
            inventory.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='sku'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SKU</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={'Product SKU'}
                      autoComplete='off'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={'Product name'}
                      autoComplete='off'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={'Product Description'}
                      autoComplete='off'
                      {...field}
                      maxLength={50}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='stock'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder={'99'}
                      autoComplete='off'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant='outline'
                  disabled={isPendingAddNewProduct || isPendingEditProduct}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type='submit'
                disabled={isPendingAddNewProduct || isPendingEditProduct}
              >
                {isPendingAddNewProduct || isPendingEditProduct ? (
                  <Spinner />
                ) : null}
                {!product ? 'Add Product' : 'Edit Product'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
