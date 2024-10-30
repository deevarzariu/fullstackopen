import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    unsetNotification(state, action) {
      return initialState;
    },
  },
});

export const { setNotification, unsetNotification } = notificationSlice.actions;

export const showNotification = (message, seconds) => {
  return async (dispatch) => {
    dispatch(setNotification(message));
    setTimeout(() => {
      dispatch(unsetNotification());
    }, seconds * 1000);
  };
};

export default notificationSlice.reducer;
