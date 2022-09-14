import { LikedPost } from "./LikedPost";
import { User } from "./User";

export type Post = {
  _id: string;
  title: string;
  text: string;
  date: Date;
  user: User;
  likes: LikedPost[]
};
