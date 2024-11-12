import { createContext, useState } from "react";

const initialState = {
  message: "",
  isError: false
}

export const NotificationContext = createContext(initialState);

const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(initialState);

  const setSuccessMessage = (message) => {
    setNotification({
      message, isError: false
    })
  }

  const setErrorMessage = (message) => {
    setNotification({
      message, isError: true
    })
  }

  const unsetNotification = () => {
    setNotification(initialState);
  }

  return <NotificationContext.Provider value={{ notification, setSuccessMessage, setErrorMessage, unsetNotification }}>
    {children}
  </NotificationContext.Provider>
}

export default NotificationProvider;