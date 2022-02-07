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
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getPosts: builder.query<IPost[], void>({
      query: () => "posts",
      providesTags: [{ type: "Post", id: "LIST" }],
    }),
    getPostById: builder.query<IPost, number | null>({
      query: (id) => `posts/${id}`,
      providesTags: ['Post'],
    }),
    addPost: builder.mutation<void, Partial<IPost>>({
      query: post => ({
        url: '/posts',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['Post'],
    }),
    updatePost: builder.mutation<void, IPost>({
      query: ({ id, ...rest }) => ({
        url: `/posts/${id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Post'],
    }),
    deletePost: builder.mutation<void, number>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post'],
    }),
  })
});

export const { useGetPostsQuery, useGetPostByIdQuery, useAddPostMutation, useUpdatePostMutation, useDeletePostMutation } = postsApi;
