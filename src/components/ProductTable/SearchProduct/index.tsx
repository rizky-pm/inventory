import { type UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { type SearchProductType } from './search-product.schema';
import { Search, X } from 'lucide-react';

interface IProps {
  form: UseFormReturn<SearchProductType>;
  refetch: () => void;
}

const SearchProduct = (props: IProps) => {
  const { refetch, form } = props;

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
            name='productName'
            render={({ field }) => (
              <FormItem className='w-60'>
                <FormControl>
                  <Input
                    placeholder={
                      form.formState.errors.productName?.message ||
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
              form.clearErrors('productName');
            }}
          >
            <X />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SearchProduct;
