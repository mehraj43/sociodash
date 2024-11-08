'use client';

import React from 'react';
import { useGetAllUsersQuery } from '../store/apiSlice/userSlice';
import { Card, CardContent, Grid2 as Grid, Typography } from '@mui/material';
import { User } from '../utils/types.user';
import Link from 'next/link';

const UserDashboard: React.FC = () => {
  const { data: userList, isLoading } = useGetAllUsersQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Grid container spacing={4} padding={4}>
      {userList?.map((user: User) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={user.id}>
          <Card variant='outlined'>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                {user.name}
              </Typography>
              <Typography variant='body2' color='textSecondary'>
                <strong>Username:</strong> {user.username}
              </Typography>
              <Typography variant='body2' color='textSecondary'>
                <strong>Email:</strong> {user.email}
              </Typography>
              <Typography variant='body2' color='textSecondary'>
                <strong>Address:</strong> {user.address.suite},{' '}
                {user.address.street}, {user.address.city}
              </Typography>
              <Typography variant='body2' color='textSecondary'>
                <strong>Phone:</strong> {user.phone}
              </Typography>
              <Typography variant='body2' color='textSecondary'>
                <strong>Company:</strong> {user.company.name}
              </Typography>
              <Link
                href={`http://${user.website}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                <Typography
                  component='a'
                  sx={{
                    color: 'blue',
                    textDecoration: 'none',
                    '&:hover': {
                      color: 'darkblue',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  {user.website}
                </Typography>
              </Link>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default UserDashboard;
