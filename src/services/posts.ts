import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/"
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<IPost[], void>({
      query: () => "posts"
    }),
    getPostById: builder.query<IPost, number | null>({
      query: (id) => `posts/${id}`
    })
  })
});

export const { useGetPostsQuery, useGetPostByIdQuery } = postsApi;
