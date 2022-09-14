import { Comment } from "./Comment";

export type ResponseComment = {
  _id: string;
  comments: Comment[];
};
