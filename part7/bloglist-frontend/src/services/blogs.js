import axios from "axios";
const baseUrl = "/api/blogs";

let token = "";

const setToken = (newToken) => (token = `Bearer ${newToken}`);

const getConfig = () => ({
  headers: {
    Authorization: token,
  },
});

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const createBlog = async (data) => {
  const res = await axios.post(baseUrl, data, getConfig());
  return res.data;
};

const updateBlog = async (blog) => {
  if (blog.user && blog.user.id) {
    blog.user = blog.user.id;
  }
  const res = await axios.put(`${baseUrl}/${blog.id}`, blog, getConfig());
  return res.data;
};

const deleteBlog = async (id) => {
  const res = await axios.delete(`${baseUrl}/${id}`, getConfig());
  return res.data;
};

const addComment = async (id, comment) => {
  const res = await axios.post(
    `${baseUrl}/${id}/comments`,
    comment,
    getConfig()
  );
  return res.data;
};

export default {
  setToken,
  getAll,
  createBlog,
  updateBlog,
  deleteBlog,
  addComment,
};
