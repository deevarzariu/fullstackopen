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
    case "ADD_COMMENT":
      return state.map((blog) =>
        blog.id === action.payload.id
          ? {
              ...blog,
              comments: blog.comments.concat(action.payload.comment),
            }
          : blog
      );
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

export const addComment = async (dispatch, id, comment) => {
  await blogService.addComment(id, { comment });
  dispatch({
    type: "ADD_COMMENT",
    payload: { id, comment },
  });
};

export default blogReducer;
