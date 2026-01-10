import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';

import { Separator } from '@/components/ui/separator';

import { EyeIcon, EyeClosedIcon } from 'lucide-react';

import Warehouse from '@/assets/images/warehouse-sign-in.jpg';

import { signInSchema, type TypeSignInSchema } from './schema';
import { TypographyH1, TypographyMuted } from '@/components/ui/typography';
import { useState } from 'react';
import { useSignInUser } from '@/services/useAuthentication';
import { Spinner } from '@/components/ui/spinner';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { mutateAsync: signInUser, isPending } = useSignInUser();

  const signInForm = useForm<TypeSignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSignIn = (values: TypeSignInSchema) => {
    signInUser(values, {
      onSuccess: (response) => {
        console.log('Success');
        const data = {
          ...response.data.user,
          ...response.data.tokens,
        };

        localStorage.setItem('user', JSON.stringify(data));
        navigate('/', { replace: true });
      },
      onError: (error) => {
        console.log('Error');
        if (error instanceof AxiosError) {
          const message = error.response?.data?.message;
          console.error(message);
          toast.error(message || 'Unexpected error, please try again later.');
        } else {
          console.error(error);
          toast.error('Unexpected error, please try again later.');
        }
      },
    });
  };

  return (
    <section className='w-screen h-screen overflow-hidden'>
      <div className='overflow-hidden relative w-full h-full'>
        <div className='w-full h-full bg-primary/50 absolute top-0 left-0 text-background flex flex-col justify-center items-center'>
          <div className='border-2 border-background bg-background text-foreground py-6 px-2 rounded-lg space-y-6'>
            <div className='space-y-1 text-center'>
              <TypographyH1 className='text-4xl'>inventory</TypographyH1>
              <p className='text-sm'>Smart. Simple. Stock control made easy.</p>
            </div>

            <div className='flex justify-center items-center overflow-hidden px-4'>
              <Form {...signInForm}>
                <form
                  onSubmit={signInForm.handleSubmit(onSignIn)}
                  className='space-y-4'
                >
                  <FormField
                    control={signInForm.control}
                    name='username'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signInForm.control}
                    name='password'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <InputGroup>
                            <InputGroupInput
                              {...field}
                              autoComplete={'off'}
                              type={showPassword ? 'text' : 'password'}
                            />
                            <InputGroupAddon align='inline-end'>
                              <InputGroupButton
                                onClick={() => {
                                  setShowPassword((prevState) => !prevState);
                                }}
                              >
                                {showPassword ? <EyeClosedIcon /> : <EyeIcon />}
                              </InputGroupButton>
                            </InputGroupAddon>
                          </InputGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type='submit' className='w-full' disabled={isPending}>
                    {isPending ? <Spinner /> : null}
                    Sign in
                  </Button>

                  <Separator />

                  <TypographyMuted className='text-center'>
                    Don't have an account? Please contact your administrator.
                  </TypographyMuted>
                </form>
              </Form>
            </div>
          </div>
        </div>
        <img src={Warehouse} alt='Warehouse' className='object-contain' />
      </div>
    </section>
  );
};

export default SignInPage;
