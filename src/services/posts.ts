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
    baseUrl: "http://localhost:3000"
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<IPost[], void>({
      query: () => "posts"
    }),
    getPostById: builder.query<IPost, number | null>({
      query: (id) => `posts/${id}`
    }),
    addPost: builder.mutation<void, IPost>({
      query: post => ({
        url: '/posts',
        method: 'POST',
        body: post,
      })
    }),
    updatePost: builder.mutation<void, IPost>({
      query: ({ id, ...rest }) => ({
        url: `/posts/${id}`,
        method: 'PUT',
        body: rest,
      })
    }),
    deletePost: builder.mutation<void, IPost>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      })
    }),
  })
});

export const { useGetPostsQuery, useGetPostByIdQuery } = postsApi;
