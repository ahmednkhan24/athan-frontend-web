import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import store from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

/*
 * In order to detect any problems with the code and provide warnings about them,
 * StrictMode renders components twice (in dev mode but not in production mode)
 * https://stackoverflow.com/questions/61254372/my-react-component-is-rendering-twice-because-of-strict-mode/61897567#61897567
 */
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline />
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>
);
