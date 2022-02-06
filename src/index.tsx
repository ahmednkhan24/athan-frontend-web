import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorkerRegistration from './worker/swRegistration';
import App from './components/App';

ReactDOM.render(
  <React.StrictMode>
    <Router basename="/">
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

/*
 * App to not work offline -> serviceWorkerRegistration.unregister();
 * App to work offline and load faster -> serviceWorkerRegistration.register();
 * Note this comes with some pitfalls.
 * Learn more about service workers: https://cra.link/PWA
 */
serviceWorkerRegistration.register();
