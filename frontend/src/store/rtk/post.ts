import { createApi } from "@reduxjs/toolkit/query/react";
import { CreatePostForm } from "src/Types/CreateFormPost";
import { CreateLikedPost } from "src/Types/CreateLikedPost";
import { Post } from "src/Types/Post";
import { User } from "src/Types/User";
import { array } from "yup/lib/locale";
import { forumApi } from ".";
import { axiosBaseQuery } from "../axiosBaseQuery";

const BASE_URL = "/post";
export const postApi = forumApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPost: builder.query<Record<string, Post>, void>({
      query: () => ({
        url: BASE_URL,
        method: "GET",
      }),
      transformResponse: (result: Post[]) => {
        return result.reduce<Record<string, Post>>((arr, obj) => {
          arr[obj._id] = obj;
          return arr;
        }, {});
      },
      providesTags: ["Post"],
    }),

    createPost: builder.mutation<void, CreatePostForm>({
      query: (post) => ({
        url: BASE_URL,
        method: "POST",
        data: post,
      }),
      invalidatesTags: ["Post"],
    }),
    updatePost: builder.mutation<void, CreatePostForm>({
      query: (editedPost) => ({
        url: BASE_URL,
        method: "PATCH",
        data: editedPost,
      }),
      invalidatesTags: ["Post"],
    }),
    deletePost: builder.mutation<void, string>({
      query: (deletedPostId) => ({
        url: BASE_URL + "/" + deletedPostId,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
    likePost: builder.mutation<void, CreateLikedPost>({
      query: (createLikedPost) => ({
        url: BASE_URL + "/like",
        method: "POST",
        data: createLikedPost,
      }),
      invalidatesTags: ["Post"],
    }),
    isPostLikedByUser: builder.query<boolean, string>({
      query: (idPost) => ({
        url: BASE_URL + "/like/" + idPost,
        method: "GET",
      }),
      providesTags: ["Post"],
    }),
    getPostsByWeek: builder.query<number, void>({
      query: () => ({
        url: BASE_URL + "/weekly",
        method: "GET",
      }),
      providesTags: ["Post"],
    }),
    getCountLikesByPosts: builder.query<number, void>({
      query: () => ({
        url: BASE_URL + "/like/count",
        method: "GET",
      }),
      providesTags: ["Post"],
    }),
    getCountAllPosts: builder.query<number, void>({
      query: () => ({
        url: BASE_URL + "/count",
        method: "GET",
      }),
      providesTags: ["Post"],
    }),
    getLikesByWeek: builder.query<number, void>({
      query: () => ({
        url: BASE_URL + "/like/weekly",
        method: "GET",
      }),
      providesTags: ["Post"],
    }),
    getBiggestContributors: builder.query<string[][], void>({
      query: () => ({
        url: BASE_URL + "/contributors",
        method: "GET",
      }),
      providesTags: ["Post"],
    }),
  }),
});

export const {
  useGetAllPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useIsPostLikedByUserQuery,
  useGetPostsByWeekQuery,
  useGetLikesByWeekQuery,
  useGetBiggestContributorsQuery,
  useGetCountLikesByPostsQuery,
  useGetCountAllPostsQuery,
} = postApi;
