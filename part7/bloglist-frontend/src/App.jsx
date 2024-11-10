import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import blogService from './services/blogs';
import loginService from './services/login';
import { createBlog, deleteBlog, fetchBlogs, updateBlog } from './reducers/blogReducer';
import { setNotification, unsetNotification } from './reducers/notificationReducer';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';

const styles = {
  error: {
    color: 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  },
  success: {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }
};

const App = () => {
  const notification = useSelector(state => state.notification);
  const blogs = useSelector(state => state.blogs);
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const togglableRef = useRef();

  useEffect(() => {
    fetchBlogs(dispatch);
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
      blogService.setToken(userData.token);
    }
  }, []);

  const showMessage = (message, isError = true, milliseconds = 1000) => {
    setNotification(dispatch, { message, isError })
    setTimeout(() => {
      unsetNotification(dispatch);
    }, milliseconds);
  }

  const handleLogin = async ({ username, password }) => {
    try {
      const userData = await loginService.login({ username, password });
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      blogService.setToken(userData.token);
      showMessage('login successful!', false, 2000);
    } catch (err) {
      showMessage(err.response.data.error, true, 5000);
    }
  };

  const handleCreatePost = async (data) => {
    togglableRef.current.toggleShowContent();

    try {
      await createBlog(dispatch, data);
      showMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`, false, 5000);
    } catch (err) {
      showMessage(err.response.data.error, true, 5000);
    }
  };

  const handleLikeBlog = async (blog) => {
    try {
      await updateBlog(dispatch, {
        ...blog,
        likes: blog.likes + 1
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

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  if (!user) {
    return <div>
      <h2>log in to application</h2>
      {notification && notification.isError && <div className='error' style={styles.error}>{notification.message}</div>}
      <LoginForm onSubmit={handleLogin} />
    </div>;
  }

  return (
    <div>
      <h2>blogs</h2>
      {notification && notification.message && !notification.isError && <div style={styles.success}>{notification.message}</div>}
      {notification && notification.message && notification.isError && <div style={styles.error}>{notification.message}</div>}
      <div>
        {user.name} logged in.
        <button onClick={handleLogout}>logout</button>
      </div>
      <h2>create new</h2>
      <Togglable ref={togglableRef} buttonLabel="new blog">
        <BlogForm onSubmit={handleCreatePost} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} onLike={handleLikeBlog} onRemove={handleRemoveBlog} />
      )}
    </div>
  );
};

export default App;