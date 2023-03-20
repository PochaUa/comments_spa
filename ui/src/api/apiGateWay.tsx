import axios from "axios";
import { UserModel } from "../types";

const url = "http://localhost:8080";

export const getComments = (parentId?: number) => {
  return axios.get(`${url}/api/comments`, { params: { parentId } });
};

export const loginUser = (user: Pick<UserModel, "username" | "password">) => {
  return axios.post(`${url}/api/user/login`, user);
};

export const registerUser = (user: Omit<UserModel, "id">) => {
  return axios.post(`${url}/api/user/register`, user);
};

export const addComment = () => {
  return axios.post(`${url}/api/comment`);
};
