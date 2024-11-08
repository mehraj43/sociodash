import { User } from '@/app/utils/types.user';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type RegisterRequest = {
  email: string;
  password: string;
};

export type RegisterResponse = {
  id: number;
  email: string;
  password: string;
};

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getAllUsers: builder.query<User[], void>({
      query: () => '/users',
      providesTags: ['Users'],
    }),
    registerUser: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (newUser) => ({
        url: '/users',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const { useGetAllUsersQuery, useRegisterUserMutation } = userApi;
