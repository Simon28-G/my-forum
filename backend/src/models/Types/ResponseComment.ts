import { CommentDocument } from '../comments/comment.schema';

export type ResponseComment = {
  _id: string;
  comments: CommentDocument[];
};
