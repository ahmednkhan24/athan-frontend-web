import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './Home';
import Content from './Content';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/content" component={Content} />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
