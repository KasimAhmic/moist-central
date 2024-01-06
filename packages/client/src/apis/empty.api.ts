import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

const baseQuery = retry(fetchBaseQuery({ baseUrl: '/' }), {
  maxRetries: 3,
});

export const emptyApi = createApi({
  baseQuery,
  endpoints: () => ({}),
});
