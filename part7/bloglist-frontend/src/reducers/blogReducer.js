import blogService from "../services/blogs";

const initialState = [];

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_BLOGS":
      return action.payload;
    case "CREATE_BLOG":
      return [...state, action.payload];
    default:
      return state;
  }
};

export const fetchBlogs = async (dispatch) => {
  const initialBlogs = await blogService.getAll();
  const sortedBlogs = [...initialBlogs];
  sortedBlogs.sort((a, b) => b.likes - a.likes);

  dispatch({
    type: "FETCH_BLOGS",
    payload: sortedBlogs,
  });
};

export const createBlog = async (dispatch, data) => {
  const newBlog = await blogService.createBlog(data);

  dispatch({
    type: "CREATE_BLOG",
    payload: newBlog,
  });
};

export default blogReducer;
