import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Home from "../pages/Home";

const AppRouter: React.FC = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </HashRouter>
  );
};

export default AppRouter;
