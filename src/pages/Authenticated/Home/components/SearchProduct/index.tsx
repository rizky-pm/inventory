import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import {
  searchProductSchema,
  type SearchProductType,
} from './search-product.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Search } from 'lucide-react';

const SearchProduct = () => {
  const form = useForm<SearchProductType>({
    resolver: zodResolver(searchProductSchema),
    defaultValues: {
      productName: '',
    },
  });

  const onSearch = (values: SearchProductType) => {
    console.log(values);
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
        </form>
      </Form>
    </div>
  );
};

export default SearchProduct;
