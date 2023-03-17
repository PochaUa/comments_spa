import axios from "axios";

const url = "http://localhost:8080";

export const getComments = () => {
  return axios.get(`${url}/api/comments`);
};
