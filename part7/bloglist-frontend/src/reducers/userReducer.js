import userService from "../services/users";

const userReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCH_USERS":
      return action.payload;
    default:
      return state;
  }
};

export const fetchUsers = async (dispatch) => {
  const users = await userService.getUsers();

  dispatch({
    type: "FETCH_USERS",
    payload: users,
  });
};

export default userReducer;
