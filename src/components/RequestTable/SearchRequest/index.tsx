import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import type { UseFormReturn } from 'react-hook-form';
import type { SearchRequestType } from './schema';

interface IProps {
  form: UseFormReturn<SearchRequestType>;
  refetch: () => void;
}

const SearchRequest = (props: IProps) => {
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
            name='requestCode'
            render={({ field }) => (
              <FormItem className='w-60'>
                <FormControl>
                  <Input
                    placeholder={
                      form.formState.errors.requestCode?.message ||
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
          <Button
            variant='outline'
            size='icon'
            aria-label='Clear search'
            onClick={() => {
              form.reset();
              form.clearErrors('requestCode');
            }}
          >
            <X />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SearchRequest;
