export const initialState = {
  message: "",
  isError: false,
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SUCCESS_MESSAGE":
      return {
        message: action.payload,
        isError: false,
      };
    case "SET_ERROR_MESSAGE":
      return {
        message: action.payload,
        isError: true,
      };
    case "RESET_MESSAGE":
      return initialState;
    default:
      return state;
  }
};

export default notificationReducer;
