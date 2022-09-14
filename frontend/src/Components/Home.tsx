import { Menu, Transition } from "@headlessui/react";
import { Formik } from "formik";
import { Fragment, useCallback, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getAll } from "src/services/post";
import { BeakerIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import * as Yup from "yup";
import { DropDown } from "./DropDown";
import { PostComponent } from "./Post";
import store, { useAppSelector } from "src/store";
import { Header } from "./Header";
import jwtDecode from "jwt-decode";
import { Post } from "src/Types/Post";
import { useDeletePostMutation, useGetAllPostQuery } from "src/store/rtk/post";
import { useGetAllCommentQuery } from "src/store/rtk/comments";
import { CommentComponent } from "./Comment";

export const Home = () => {
  const user = useAppSelector((store) => store.user);
  const { data: posts } = useGetAllPostQuery();
  const { data: records } = useGetAllCommentQuery();
  const payload = user.access_token
    ? jwtDecode<{ userId: string }>(user.access_token)
    : undefined;

  return (
    <div className="">
      <Header />
      {posts && records && (
        <div className=" text-center  justify-center items-center flex flex-col gap-y-6 ">
          {Object.values(posts).map((post) => {
            return (
              <>
                <PostComponent
                  key={post._id}
                  postId={post._id}
                  currentId={payload?.userId}
                />
                <div className="text-center border border-red-800  rounded w-1/2 py-3 px-3 text-grey-darker gap-y-3">
                  <Link to={"/comment"} state={post._id}>
                    <button type="button"> Write comment</button>
                  </Link>
                </div>
                {records[post._id]?.map((comment) => (
                  <CommentComponent
                    currentId={payload?.userId}
                    postId={post._id}
                    comment={comment}
                  />
                ))}
              </>
            );
          })}
        </div>
      )}
    </div>
  );
};
