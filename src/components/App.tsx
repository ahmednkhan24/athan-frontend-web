import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './Navbar';
import Home from './Screens/Home';
import Content from './Screens/Content';

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
