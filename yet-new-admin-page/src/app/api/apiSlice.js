import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api', // Unique name for the API slice
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
    prepareHeaders: (headers, { getState }) => {
      // Get token from localStorage or Redux state
      const token = localStorage.getItem('token');  // Or use getState() to fetch from Redux store

      // If token exists, add it as a Bearer token to the Authorization header
      if (token) {
        console.log('token found')
        headers.set('Authorization', `Bearer ${token}`);
      } else {
        console.log(token)
        return
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSchedules: builder.query({
      query: () => '/admin/get-all-schedule',
    }),
    getDrivers: builder.query({
      query: () => '/admin/get-all-drivers',
    }),
    getHelpers: builder.query({
      query: () => '/admin/get-all-helpers',
    }),
    getBuses: builder.query({
      query: () => '/admin/get-all-busses',
    }),
    getRoutes: builder.query({
      query: () => '/admin/get-all-routes',
    }),
    login: builder.mutation({
      query: (loginParameters) => ({
        url: '/admin-auth/login',
        method: 'POST',
        body: loginParameters,
      }),
    }),
    createSchedule: builder.mutation({
      query: (createSchedule) => ({
        url: '/admin/create-schedule',
        method: 'POST',
        body: createSchedule,
      }),
    }),
    createDriver: builder.mutation({
      query: (DriverData) => ({
        url: '/driver/signup',
        method: 'POST',
        body: DriverData,
      }),
    }),
    createHelper: builder.mutation({
      query: (HelperData) => ({
        url: '/helper/signup',
        method: 'POST',
        body: HelperData,
      }),
    }),
    createBus: builder.mutation({
      query: (BusData) => ({
        url: '/admin/create-bus',
        method: 'POST',
        body: BusData,
      }),
    }),
    createRoute: builder.mutation({
      query: (routeData) => ({
        url: '/admin/create-route',
        method: 'POST',
        body: routeData,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useCreateScheduleMutation,
  useCreateDriverMutation,
  useCreateHelperMutation,
  useCreateBusMutation,
  useCreateRouteMutation,
  useGetSchedulesQuery,
  useGetDriversQuery,
  useGetHelpersQuery,
  useGetBusesQuery,
  useGetRoutesQuery,
} = apiSlice; // Export hooks
