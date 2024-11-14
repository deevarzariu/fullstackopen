import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import blogService from "./services/blogs";
import { fetchBlogs } from "./reducers/blogReducer";
import {
  setNotification,
  unsetNotification,
} from "./reducers/notificationReducer";
import { login, logout } from "./reducers/loginReducer";
import LoginForm from "./components/LoginForm";
import UsersView from "./views/UsersView";
import UserView from "./views/UserView";
import HomeView from "./views/HomeView";
import { fetchUsers } from "./reducers/userReducer";

const styles = {
  error: {
    color: "red",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  },
  success: {
    color: "green",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  },
};

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

  console.log(user);
  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        {notification && notification.isError && (
          <div className="error" style={styles.error}>
            {notification.message}
          </div>
        )}
        <LoginForm onSubmit={handleLogin} />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      {notification && notification.message && !notification.isError && (
        <div style={styles.success}>{notification.message}</div>
      )}
      {notification && notification.message && notification.isError && (
        <div style={styles.error}>{notification.message}</div>
      )}
      <div>
        {user.name} logged in.
        <button onClick={handleLogout}>logout</button>
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<HomeView />}>
          </Route>
          <Route path="/users" element={<UsersView />} />
          <Route path="/users/:id" element={<UserView />} />
        </Routes>
      </Router>
    </div>

  );
};

export default App;
