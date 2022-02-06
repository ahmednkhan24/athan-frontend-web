import React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './NavBar';
import Home from '../screens/Home';
import Content from '../screens/Content';

const Router: React.FC = () => {
  return (
    <HashRouter>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/content" component={Content} />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </HashRouter>
  );
};

export default Router;
