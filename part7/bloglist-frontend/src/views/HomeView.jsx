import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createBlog,
  deleteBlog,
  updateBlog,
} from "../reducers/blogReducer";
import {
  setNotification,
  unsetNotification
} from "../reducers/notificationReducer";
import Blog from "../components/Blog";
import BlogForm from "../components/BlogForm";
import Togglable from "../components/Togglable";

const HomeView = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const togglableRef = useRef();
  const dispatch = useDispatch();

  const showMessage = (message, isError = true, milliseconds = 1000) => {
    setNotification(dispatch, { message, isError });
    setTimeout(() => {
      unsetNotification(dispatch);
    }, milliseconds);
  };

  const handleCreatePost = async (data) => {
    togglableRef.current.toggleShowContent();

    try {
      await createBlog(dispatch, data);
      showMessage(
        `a new blog ${newBlog.title} by ${newBlog.author} added`,
        false,
        5000,
      );
    } catch (err) {
      showMessage(err.response.data.error, true, 5000);
    }
  };

  const handleLikeBlog = async (blog) => {
    try {
      await updateBlog(dispatch, {
        ...blog,
        likes: blog.likes + 1,
      });
    } catch (err) {
      showMessage(err.response.data.error);
    }
  };

  const handleRemoveBlog = async (blog) => {
    if (confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await deleteBlog(dispatch, blog.id);
      } catch (err) {
        showMessage(err.response.data.error);
      }
    }
  };

  return <>
    <h2>create new</h2>
    <Togglable ref={togglableRef} buttonLabel="new blog">
      <BlogForm onSubmit={handleCreatePost} />
    </Togglable>
    <div className="mt-3">
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          onLike={handleLikeBlog}
          onRemove={handleRemoveBlog}
        />
      ))}
    </div>
  </>
}

export default HomeView;