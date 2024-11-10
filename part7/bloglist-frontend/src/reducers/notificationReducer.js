const initialState = {
  message: "",
  isError: false
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return {
        ...action.payload
      }
    case 'UNSET_NOTIFICATION':
      return initialState;
    default:
      return state;
  }
}

export const setNotification = (dispatch, payload) => {
  dispatch({
    type: "SET_NOTIFICATION",
    payload
  });
}

export const unsetNotification = dispatch => {
  dispatch({
    type: "UNSET_NOTIFICATION"
  });
}

export default notificationReducer;