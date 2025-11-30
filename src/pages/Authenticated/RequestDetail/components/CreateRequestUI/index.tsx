import type { IProductInCart } from '@/stores/useCartStore';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import type { TypeCreateRequestSchema } from '../../schema';
import ProductCard from '../ProductCard';
import type { UseFormReturn } from 'react-hook-form';
import { TypographyH4 } from '@/components/ui/typography';

interface CreateRequestUIProps {
  form: UseFormReturn<TypeCreateRequestSchema>;
  products: IProductInCart[];
  total: () => number;
  isPending: boolean;
  onCreateRequest: (values: TypeCreateRequestSchema) => void;
}

const CreateRequestUI = ({
  form,
  products,
  total,
  isPending,
  onCreateRequest,
}: CreateRequestUIProps) => {
  return (
    <>
      <div className='flex flex-col'>
        <TypographyH4>Request Information</TypographyH4>

        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

        <div className='py-4 flex justify-between'>
          <p className='font-semibold'>Total</p>
          <span>
            {total()} {total() > 1 ? 'Items' : 'Item'}
          </span>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onCreateRequest)}
          className='space-y-4'
        >
          <FormField
            control={form.control}
            name='files'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Document <span className='text-red-600'>*</span>
                </FormLabel>

                <FormControl>
                  <Input
                    type='file'
                    onChange={(e) => {
                      const selected = e.target.files;
                      if (!selected) return;
                      field.onChange(selected[0]);
                    }}
                    accept='.pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='remarks'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Remarks</FormLabel>

                <FormControl>
                  <Textarea placeholder='Remarks...' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex'>
            <Button
              type='submit'
              disabled={isPending}
              className='ml-auto'
              onClick={() => {
                onCreateRequest(form.getValues());
              }}
            >
              {isPending ? (
                <>
                  <Spinner /> Creating request
                </>
              ) : (
                'Create Request'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default CreateRequestUI;
