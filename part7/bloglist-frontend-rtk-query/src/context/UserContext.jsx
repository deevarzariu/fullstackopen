import { createContext, useReducer } from "react";
import userReducer from "../reducers/userReducer";
import loginService from "../services/login";
import blogService from "../services/blogs";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, dispatchUser] = useReducer(userReducer);

  const dispatchLogin = (userData) => ({
    type: "LOGIN",
    payload: userData
  })

  const login = async (credentials) => {
    const userData = await loginService.login(credentials);
    dispatchLogin(userData)
    localStorage.setItem('user', JSON.stringify(userData));
    blogService.setToken(userData.token);
  }

  const loginFromStorage = () => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      dispatchLogin(userData)
      blogService.setToken(userData.token);
    }
  }

  const logout = () => {
    dispatchUser({ type: "LOGOUT" });
    localStorage.removeItem("user");
  }

  return <UserContext.Provider value={{ user, login, loginFromStorage, logout }}>
    {children}
  </UserContext.Provider>
}

export default UserProvider;