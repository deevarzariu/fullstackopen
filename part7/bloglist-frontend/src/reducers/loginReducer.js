import blogService from "../services/blogs";
import loginService from "../services/login";

const initialState = null;

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};

export const login = async (dispatch, credentials) => {
  const userData = await loginService.login(credentials);
  localStorage.setItem("user", JSON.stringify(userData));
  blogService.setToken(userData.token);

  dispatch({
    type: "LOGIN",
    payload: userData,
  });
};

export const logout = (dispatch) => {
  dispatch({ type: "LOGOUT" });
};

export default loginReducer;
