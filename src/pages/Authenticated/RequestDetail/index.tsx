import SectionWrapper from '@/components/SectionWrapper';
import { useCartStore } from '@/stores/useCartStore';
import ProductCard from './components/ProductCard';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createRequestSchema, type TypeCreateRequestSchema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useCreateNewRequest } from '@/services/useRequest';
import axios from 'axios';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';
import { useLocation, useNavigate } from 'react-router-dom';

const RequestDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location);
  const form = useForm<TypeCreateRequestSchema>({
    resolver: zodResolver(createRequestSchema),
    defaultValues: {
      files: undefined,
      items: undefined,
      remarks: '',
    },
  });

  const { products, total } = useCartStore();
  const { mutateAsync, isPending } = useCreateNewRequest();

  const onCreateRequest = (values: TypeCreateRequestSchema) => {
    const payload = {
      ...values,
      files: [values.files],
    };

    mutateAsync(payload, {
      onSuccess: () => {
        toast.success('Success create request', {
          onAutoClose: () => {
            navigate('/');
            localStorage.removeItem('cart-storage');
          },
        });
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          console.log(error.response?.data.message);

          toast.error(
            <div>
              {error.response?.data.message.map(
                (item: Record<string, string>) => (
                  <div key={item.product_id}>{item.details}</div>
                )
              )}
            </div>
          );
        }
      },
    });
  };

  useEffect(() => {
    if (products.length) {
      form.setValue('items', products);
    }
  }, [products, form]);

  return (
    <SectionWrapper>
      <h1>Request Detail</h1>
      {products.length ? (
        <div className='w-full flex flex-col justify-center items-center'>
          <div className='w-1/2 flex flex-col gap-4'>
            <div className='flex flex-col'>
              {products.map((product) => (
                <ProductCard product={product} key={product.id} />
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
                            const selectedFile = e.target.files;

                            if (!selectedFile) return;
                            console.log(selectedFile[0]);
                            const file = selectedFile[0];

                            field.onChange(file);
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
                        <Textarea
                          id='remarks'
                          placeholder='Remarks...'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type='submit' disabled={isPending}>
                  {isPending ? (
                    <>
                      <Spinner /> Creating request
                    </>
                  ) : (
                    'Create Request'
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      ) : (
        <p>You have no request yet.</p>
      )}
    </SectionWrapper>
  );
};

export default RequestDetailPage;
