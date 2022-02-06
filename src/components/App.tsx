import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './test';
import Home from './test/Home';
import Content from './test/Content';

const App: React.FC = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/content" component={Content} />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </>
  );
};

export default App;
