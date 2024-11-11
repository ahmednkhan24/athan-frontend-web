import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Providers } from './contexts';

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
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
);
