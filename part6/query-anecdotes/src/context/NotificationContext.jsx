import { createContext, useReducer } from "react";
import notificationReducer from "../reducers/notificationReducer";

export const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [notification, dispatchNotification] = useReducer(notificationReducer, "")

  return <NotificationContext.Provider value={{ notification, dispatchNotification }} >
    {children}
  </NotificationContext.Provider>
}

export default NotificationProvider;