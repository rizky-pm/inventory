import { type SearchBranchType } from './schema';
import { type UseFormReturn } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface IProps {
  form: UseFormReturn<SearchBranchType>;
  refetch: () => void;
}

const SearchBranch = (props: IProps) => {
  const { form, refetch } = props;

  const onSearch = () => {
    refetch();
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSearch)}
          className='flex items-end gap-2'
        >
          <FormField
            control={form.control}
            name='branchName'
            render={({ field }) => (
              <FormItem className='w-60'>
                <FormControl>
                  <Input
                    placeholder={
                      form.formState.errors.branchName?.message ||
                      'Product name'
                    }
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type='submit'
            variant='outline'
            size='icon'
            aria-label='Search'
          >
            <Search />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SearchBranch;
