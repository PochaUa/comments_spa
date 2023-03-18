import axios from "axios";

const url = "http://localhost:8080";

export const getComments = (parentId?: number) => {
  return axios.get(`${url}/api/comments`, { params: { parentId } });
};

export const getUsers = () => {
  return axios.get(`${url}/api/users`);
};

export const register = () => {
  return axios.post(`${url}/api/user`);
};

export const addComment = () => {
  return axios.post(`${url}/api/comment`);
};
