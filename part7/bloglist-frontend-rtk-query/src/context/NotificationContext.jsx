import { createContext, useReducer } from "react";
import notificationReducer, { initialState } from "../reducers/notificationReducer";

export const NotificationContext = createContext(initialState);

const NotificationProvider = ({ children }) => {
  const [notification, dispatchNotification] = useReducer(notificationReducer, initialState);

  const setSuccessMessage = (message) => {
    dispatchNotification({
      type: "SET_SUCCESS_MESSAGE",
      payload: message
    })
  }

  const setErrorMessage = (message) => {
    dispatchNotification({
      type: "SET_ERROR_MESSAGE",
      payload: message
    })
  }

  const resetMessage = () => {
    dispatchNotification({
      type: "RESET_MESSAGE"
    });
  }

  return <NotificationContext.Provider value={{ notification, setSuccessMessage, setErrorMessage, resetMessage }}>
    {children}
  </NotificationContext.Provider>
}

export default NotificationProvider;