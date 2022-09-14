import { Formik } from "formik";
import jwtDecode from "jwt-decode";
import moment from "moment";
import { useId, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deletePost } from "src/services/post";
import store, { useAppSelector } from "src/store";
import {
  useDeletePostMutation,
  useGetAllPostQuery,
  useIsPostLikedByUserQuery,
  useLikePostMutation,
} from "src/store/rtk/post";
import { Post } from "src/Types/Post";
import { MyTextInput } from "./Auth";
import { UpdatePost } from "./UpdatePost";

interface Props {
  currentId?: string;
  postId: string;
}
export const PostComponent = (props: Props) => {
  const { data, error } = useGetAllPostQuery();
  const [deletePost] = useDeletePostMutation();
  const [likePost] = useLikePostMutation();
  const [showForm, setShowForm] = useState(false);
  const { data: isPostLiked } = useIsPostLikedByUserQuery(props.postId);

  const post = data![props.postId];

  return (
    <>
      {post?.user.username && (
        <div className="   shadow appearance-none border rounded w-1/2 py-3 px-3 text-grey-darker gap-y-3">
          <h1>{post.title}</h1>

          <div className="py-3">{post.text}</div>
          <div className="border ">
            <div>{moment(post.date).startOf("minute").fromNow()}</div>
            <div>Posted by {post?.user.username}</div>
          </div>
          {props.currentId === post?.user._id && (
            <>
              <div className="text-right">
                <button type="button" onClick={() => setShowForm(true)}>
                  Update post
                </button>
              </div>
              <div className="text-left">
                <button type="button" onClick={() => deletePost(post._id)}>
                  Delete post
                </button>
              </div>
            </>
          )}
          {props.currentId !== post.user._id && (
            <button
              className="px-5 py-2 flex flex-col items-center font-bold text-white rounded rounded-tr-3xl rounded-bl-3xl bg-gradient-to-r from-red-500 via-orange-400  via-yellow-500 via-vlue-500 to-purple-300"
              onClick={() => likePost({ post: post._id })}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={isPostLiked ? "h-4 text-red-800" : "h-4 text-white"}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
      )}
      {showForm && (
        <UpdatePost idPost={post._id} setShowForm={() => setShowForm(false)} />
      )}
    </>
  );
};
