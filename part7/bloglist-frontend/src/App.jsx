import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Alert } from "react-bootstrap";
import blogService from "./services/blogs";
import { fetchBlogs } from "./reducers/blogReducer";
import { fetchUsers } from "./reducers/userReducer";
import {
  setNotification,
  unsetNotification,
} from "./reducers/notificationReducer";
import { login, logout } from "./reducers/loginReducer";
import LoginForm from "./components/LoginForm";
import Navigation from "./components/Navigation";
import UsersView from "./views/UsersView";
import UserView from "./views/UserView";
import HomeView from "./views/HomeView";
import BlogView from "./views/BlogView";

const App = () => {
  const notification = useSelector((state) => state.notification);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchBlogs(dispatch);
    fetchUsers(dispatch);
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      dispatch({
        type: "LOGIN",
        payload: userData,
      });
      blogService.setToken(userData.token);
    }
  }, []);

  const showMessage = (message, isError = true, milliseconds = 1000) => {
    setNotification(dispatch, { message, isError });
    setTimeout(() => {
      unsetNotification(dispatch);
    }, milliseconds);
  };

  const handleLogin = async ({ username, password }) => {
    try {
      await login(dispatch, { username, password });
      showMessage("login successful!", false, 2000);
    } catch (err) {
      showMessage(err.response.data.error, true, 5000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    logout(dispatch);
  };

  if (!user) {
    return (
      <div className="container pt-5">
        <h2>log in to application</h2>
        {notification && notification.isError && (
          <Alert variant="danger" className="error">
            {notification.message}
          </Alert>
        )}
        <LoginForm onSubmit={handleLogin} />
      </div>
    );
  }

  return (
    <div className="container pt-5">
      <h2>blogs</h2>
      {notification && notification.message && !notification.isError && (
        <Alert variant="success">{notification.message}</Alert>
      )}
      {notification && notification.message && notification.isError && (
        <Alert variant="danger">{notification.message}</Alert>
      )}
      <Router>
        <Navigation user={user} onLogout={handleLogout} />
        <div className="mt-2">
          <Routes>
            <Route path="/" element={<HomeView />}>
            </Route>
            <Route path="/users" element={<UsersView />} />
            <Route path="/users/:id" element={<UserView />} />
            <Route path="/blogs/:id" element={<BlogView />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
