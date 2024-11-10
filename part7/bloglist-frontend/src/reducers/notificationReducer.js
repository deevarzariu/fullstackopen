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

export default notificationReducer;