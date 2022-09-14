import moment from "moment";
import { useState } from "react";

import { Link } from "react-router-dom";
import {
  useDeleteCommentMutation,
  useGetAllCommentQuery,
  useIsCommentLikedByUserQuery,
  useLikeCommentMutation,
} from "src/store/rtk/comments";
import { Comment } from "src/Types/Comment";
import { UpdateComment } from "./UpdateComment";
import { UpdatePost } from "./UpdatePost";

type CommentProps = {
  currentId?: string;
  postId: string;
  comment: Comment;
};
export const CommentComponent = ({
  currentId,
  postId,
  comment,
}: CommentProps) => {
  const [deleteComment] = useDeleteCommentMutation();
  const [showForm, setShowForm] = useState(false);
  const [likeComment] = useLikeCommentMutation();
  const { data: isCommentLiked } = useIsCommentLikedByUserQuery(comment._id);

  return (
    <>
      {comment.author.username && (
        <>
          <div className="    border border-red-800  rounded w-1/2 py-3 px-3 text-grey-darker gap-y-3">
            <div className="py-3">{comment.text}</div>
            <div className="border border-red-800 ">
              <div>{moment(comment.date).startOf("minute").fromNow()}</div>
              <div>Posted by {comment.author.username}</div>
            </div>
            {currentId === comment.author._id && (
              <>
                <div className="text-right">
                  <button type="button" onClick={() => setShowForm(true)}>
                    Update comment
                  </button>
                </div>
                <div className="text-left">
                  <button
                    type="button"
                    onClick={async () => {
                      deleteComment(comment._id);
                    }}
                  >
                    Delete comment
                  </button>
                </div>
              </>
            )}
            {currentId !== comment.author._id && (
              <button
                className="px-5 py-2 flex flex-col items-center font-bold text-white rounded rounded-tr-3xl rounded-bl-3xl bg-gradient-to-r from-red-500 via-orange-400  via-yellow-500 via-vlue-500 to-purple-300"
                onClick={() => likeComment({ comment: comment._id })}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={
                    isCommentLiked ? "h-4 text-red-800" : "h-4 text-white"
                  }
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
            {showForm && (
              <UpdateComment
                idComment={comment._id}
                idPost={postId}
                setShowForm={() => setShowForm(false)}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};
