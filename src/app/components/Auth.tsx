'use client';
import React from 'react';
import AuthForm from './AuthForm';
import { Stack } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Auth = () => {
  const pathname = usePathname();
  console.log({ pathname });
  const isLoginPage = pathname === '/login';

  return (
    <Stack
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
      spacing={2}
    >
      <AuthForm isLoginPage={isLoginPage} />
      <Stack direction='row' spacing={1}>
        <p>
          {isLoginPage ? "Don't have an account?" : 'Already have an account?'}
        </p>
        <Link href={isLoginPage ? '/register' : '/login'}>
          {isLoginPage ? 'Register' : 'Login'}
        </Link>
      </Stack>
    </Stack>
  );
};

export default Auth;
