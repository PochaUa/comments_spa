import axios from "axios";
import { CommentModel, UserModel } from "../types";

const url = "http://localhost:8080";

export const getComments = (
  parentId?: number
): Promise<{ data: CommentModel[] }> => {
  return axios.get(`${url}/api/comments`, { params: { parentId } });
};

export const loginUser = (
  user: Pick<UserModel, "username" | "password">
): Promise<{ data: UserModel }> => {
  return axios.post(`${url}/api/user/login`, user);
};

export const registerUser = (
  user: Omit<UserModel, "id">
): Promise<{ data: UserModel }> => {
  return axios.post(`${url}/api/user/register`, user);
};

export const addComment = (
  comment: Pick<CommentModel, "userId" | "parentId" | "file" | "text">
) => {
  return axios.post(`${url}/api/comment`, comment);
};
