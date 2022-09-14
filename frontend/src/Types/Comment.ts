import { LikedComment } from "./LikedComment";
import { User } from "./User";

export type Comment = {
  _id: string;
  text: string;
  date: Date;
  post: string;
  author: User;
  likes: LikedComment[];
};
