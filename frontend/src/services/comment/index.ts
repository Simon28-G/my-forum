import { AxiosResponse } from "axios";
import { Post } from "src/Types/Post";
import api from "..";

export const getAll = () => api.post("/home");
export const getOne = (_id: string) => api.post("/managePosts/getOne", { _id });

export const insert = (post: Post) => api.post("/managePosts/create", post);

export const update = (editedPost: Post) =>
  api.post("/managePosts/update", editedPost);

export const deletePost = (deletingPost: Post) => {
  api.post("/managePosts/delete", deletingPost);
};
