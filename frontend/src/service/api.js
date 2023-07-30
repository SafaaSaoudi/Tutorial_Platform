import axios from "axios";

const url = "http://localhost:8000/params";

export const getParams = async (id) => {
  id = id || "";
  return await axios.get(`${url}/${id}`);
};
export const addParams = async (params) => {
  return await axios.post(url + "/add/", params);
};
export const deleteParams = async (id) => {
  return await axios.post(`${url}/delete/${id}`);
};
