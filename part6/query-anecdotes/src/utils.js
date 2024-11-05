export const showNotification = (dispatch, message, seconds = 1) => {
  dispatch({
    type: "SET_NOTIFICATION",
    payload: message,
  });
  setTimeout(() => {
    dispatch({
      type: "UNSET_NOTIFICATION",
    });
  }, seconds * 1000);
};
