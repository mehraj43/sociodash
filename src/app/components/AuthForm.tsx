'use client';
import { Button, Snackbar, Stack, TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useRegisterUserMutation } from '../store/apiSlice/userSlice';
import { useRouter } from 'next/navigation';

type FormData = {
  email: string;
  password: string;
};

type Props = {
  isLoginPage: boolean;
};
const AuthForm: React.FC<Props> = ({ isLoginPage }) => {
  const router = useRouter();
  const [registerUser, { isLoading, isSuccess }] = useRegisterUserMutation();
  const form = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { register, handleSubmit, formState, control } = form;
  const { errors } = formState;

  const onSubmit = async (data: FormData) => {
    if (!isLoginPage) {
      try {
        const result = await registerUser(data).unwrap();
        console.log({ result });
        if (result) {
          const timeoutId = setTimeout(() => {
            clearTimeout(timeoutId);
            router.push('/dashboard');
          }, 2000);
        }
      } catch (error: unknown) {
        console.log({ error });
      }
    }
    console.log({ user_email: data.email, user_password: data.password });
  };

  return (
    <>
      <h1>{isLoginPage ? 'Login' : 'Register'}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} width={400}>
          <TextField
            label='Email'
            type='email'
            {...register('email', {
              required: 'Email is required, please enter an email address',
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label='Password'
            type='password'
            {...register('password', {
              required: 'Password is required, please enter your password',
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            disabled={isLoading}
            type='submit'
            variant='contained'
            color='primary'
          >
            Submit
          </Button>
        </Stack>
      </form>
      <Snackbar
        open={isSuccess}
        autoHideDuration={3000}
        message='You account has been successfully registered'
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      />
      <DevTool control={control} />
    </>
  );
};

export default AuthForm;
