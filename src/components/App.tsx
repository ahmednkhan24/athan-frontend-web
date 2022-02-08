import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './navbar';
import Home from './screens/Home';
import Content from './screens/Content';

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
