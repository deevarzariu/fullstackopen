import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer';
import blogReducer from './reducers/blogReducer';
import App from './App';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);