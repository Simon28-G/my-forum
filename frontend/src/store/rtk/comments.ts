import { createApi } from "@reduxjs/toolkit/query/react";
import { Comment } from "src/Types/Comment";
import { CreateCommentForm } from "src/Types/CreateCommentForm";
import { CreateLikedComment } from "src/Types/CreateLikedComment";
import { Post } from "src/Types/Post";
import { ResponseComment } from "src/Types/ResponseComment";
import { array } from "yup/lib/locale";
import { forumApi } from ".";
import { axiosBaseQuery } from "../axiosBaseQuery";

const BASE_URL = "/comment";
export const commentApi = forumApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllComment: builder.query<Record<string, Comment[]>, void>({
      query: () => ({
        url: BASE_URL,
        method: "GET",
      }),
      transformResponse: (result: Comment[]) => {
        console.log(result);
        const data = result.reduce<Record<string, Comment[]>>((arr, obj) => {
          if (arr[obj.post] === undefined) {
            arr[obj.post] = [];
          }
          arr[obj.post].push(obj);
          return arr;
        }, {});
        return data;
      },

      providesTags: ["Comment"],
    }),

    createComment: builder.mutation<void, CreateCommentForm>({
      query: (post) => ({
        url: BASE_URL,
        method: "POST",
        data: post,
      }),
      invalidatesTags: ["Comment"],
    }),
    updateComment: builder.mutation<void, CreateCommentForm>({
      query: (editedComment) => ({
        url: BASE_URL,
        method: "PATCH",
        data: editedComment,
      }),
      invalidatesTags: ["Comment"],
    }),
    deleteComment: builder.mutation<void, string>({
      query: (deletedCommentId) => ({
        url: BASE_URL + "/" + deletedCommentId,
        method: "DELETE",
      }),
      invalidatesTags: ["Comment"],
    }),

    likeComment: builder.mutation<void, CreateLikedComment>({
      query: (createLikedComment) => ({
        url: BASE_URL + "/like",
        method: "POST",
        data: createLikedComment,
      }),
      invalidatesTags: ["Comment"],
    }),
    isCommentLikedByUser: builder.query<boolean, string>({
      query: (idComment) => ({
        url: BASE_URL + "/like/comment/" + idComment,
        method: "GET",
      }),
      providesTags: ["Comment"],
    }),
  }),
});

export const {
  useGetAllCommentQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useLikeCommentMutation,
  useIsCommentLikedByUserQuery,
} = commentApi;
