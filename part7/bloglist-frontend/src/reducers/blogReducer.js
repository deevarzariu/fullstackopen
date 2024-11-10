import blogService from "../services/blogs";

const initialState = [];

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_BLOGS":
      return action.payload;
    case "CREATE_BLOG":
      return [...state, action.payload];
    case "UPDATE_BLOG":
      return [
        ...state.map((blog) =>
          blog.id === action.payload.id ? action.payload : blog
        ),
      ].sort((a, b) => b.likes - a.likes);
    case "DELETE_BLOG":
      return state.filter((blog) => blog.id !== action.payload);
    default:
      return state;
  }
};

export const fetchBlogs = async (dispatch) => {
  const initialBlogs = await blogService.getAll();
  const sortedBlogs = [...initialBlogs].sort((a, b) => b.likes - a.likes);

  dispatch({
    type: "FETCH_BLOGS",
    payload: sortedBlogs,
  });
};

export const createBlog = async (dispatch, data) => {
  const payload = await blogService.createBlog(data);

  dispatch({
    type: "CREATE_BLOG",
    payload,
  });
};

export const updateBlog = async (dispatch, blog) => {
  const payload = await blogService.updateBlog(blog);
  payload.user = blog.user;

  dispatch({
    type: "UPDATE_BLOG",
    payload,
  });
};

export const deleteBlog = async (dispatch, id) => {
  await blogService.deleteBlog(id);
  dispatch({
    type: "DELETE_BLOG",
    payload: id,
  });
};

export default blogReducer;
