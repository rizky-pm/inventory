import { useQueryClient } from '@tanstack/react-query';
import { useEffect, type SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import type { IBranch } from 'types';
import { addBranchSchema, type AddBranchType } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAddNewBranch, useEditBranch } from '@/services/useBranch';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

interface Props {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<SetStateAction<boolean>>;
  branch?: IBranch;
}

const AddBranchDialog = (props: Props) => {
  const { isDialogOpen, setIsDialogOpen, branch } = props;
  const queryClient = useQueryClient();
  const form = useForm<AddBranchType>({
    resolver: zodResolver(addBranchSchema),
    defaultValues: {
      name: '',
      address: '',
    },
  });

  const { mutate: addNewBranch, isPending: isAddNewBranchPending } =
    useAddNewBranch();
  const { mutate: editBranch, isPending: isPendingEditBranch } =
    useEditBranch();

  const onSubmit = (values: AddBranchType) => {
    console.log(values);

    if (!branch) {
      addNewBranch(values, {
        onSuccess: async () => {
          setIsDialogOpen(false);
          await queryClient.invalidateQueries({
            queryKey: ['branch.get-branches'],
          });
          toast.success('Success add new branch');
        },
        onError: (error) => {
          console.error(error);
          toast.error(
            'Something went wrong while adding new branch, please try again later.'
          );
        },
      });
    } else {
      const body = {
        ...values,
        id: branch.id,
      };
      editBranch(body, {
        onSuccess: async () => {
          setIsDialogOpen(false);
          await queryClient.invalidateQueries({
            queryKey: ['branch.get-branches'],
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

  useEffect(() => {
    if (branch) {
      form.setValue('name', branch.name);
      form.setValue('address', branch.address);
    }
  }, [branch, form]);

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
          <DialogTitle>Add New Branch</DialogTitle>
          <DialogDescription>
            Enter the branch details below to register a new branch in the
            system.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Branch name'
                      autoComplete='off'
                      disabled={isPendingEditBranch || isPendingEditBranch}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='address'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={'Product Description'}
                      autoComplete='off'
                      disabled={isPendingEditBranch || isPendingEditBranch}
                      {...field}
                      maxLength={50}
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
                  disabled={isAddNewBranchPending || isPendingEditBranch}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type='submit'
                disabled={isAddNewBranchPending || isPendingEditBranch}
              >
                {isAddNewBranchPending || isPendingEditBranch ? (
                  <Spinner />
                ) : null}
                {!branch ? 'Add Branch' : 'Edit Branch'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBranchDialog;
