import { useState, useEffect, useRef, useContext } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import { NotificationContext } from './context/NotificationContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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
  const {
    notification,
    setErrorMessage,
    setSuccessMessage,
    resetMessage
  } = useContext(NotificationContext);
  const [user, setUser] = useState(null);
  const togglableRef = useRef();
  const queryClient = useQueryClient();

  const createBlogMutation = useMutation({
    mutationFn: blogService.createBlog,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs']);
      queryClient.setQueryData(['blogs', [...blogs, newBlog]]);

      showSuccessMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`, 5000);
    },
    onError: (err) => {
      showErrorMessage(err.response.data.error, 5000);
    }
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
      blogService.setToken(userData.token);
    }
  }, []);

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll
  });

  if (result.isLoading) {
    return <div>Loading...</div>
  }

  const blogs = [...result.data].sort((a, b) => b.likes - a.likes);

  const showSuccessMessage = (message, milliseconds = 1000) => {
    setSuccessMessage(message);
    setTimeout(() => {
      resetMessage();
    }, milliseconds);
  };

  const showErrorMessage = (message, milliseconds = 1000) => {
    setErrorMessage(message);
    setTimeout(() => {
      resetMessage();
    }, milliseconds);
  };

  const handleLogin = async ({ username, password }) => {
    try {
      const userData = await loginService.login({ username, password });
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      blogService.setToken(userData.token);
      showSuccessMessage('login successful!', 2000);
    } catch (err) {
      showErrorMessage(err.response.data.error, 5000);
    }
  };

  const handleCreatePost = async ({ title, author, url }) => {
    togglableRef.current.toggleShowContent();
    createBlogMutation.mutate({ title, author, url });
  };

  const handleLikeBlog = async (blog) => {
    try {
      const payload = { ...blog, likes: ++blog.likes };
      const updatedBlog = await blogService.updateBlog(payload);
      updatedBlog.user = blog.user;

      const updatedBlogs = blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog);
      updatedBlogs.sort((a, b) => b.likes - a.likes);
      // setBlogs(updatedBlogs);
    } catch (err) {
      showErrorMessage(err.response.data.error);
    }
  };

  const handleRemoveBlog = async (blog) => {
    if (confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.deleteBlog(blog.id);
        // setBlogs(blogs.filter(({ id }) => id !== blog.id));
      } catch (err) {
        showErrorMessage(err.response.data.error);
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
      {notification.message && notification.isError &&
        <div className='error' style={styles.error}>{notification.message}</div>
      }
      <LoginForm onSubmit={handleLogin} />
    </div>;
  }

  return (
    <div>
      <h2>blogs</h2>
      {notification.message &&
        <div style={notification.isError ? styles.error : styles.success}>{notification.message}</div>
      }
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