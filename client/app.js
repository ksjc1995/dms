import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";

import Home from "./components/Home/Home";
import User from "./components/User/User";
import Admin from "./components/Admin/Admin";
import Error404 from "./components/Error/Error404";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch> 
          <Route path="/user" component={User} />
          <Route path="/admin" component={Admin} />
          <Route path="/" component={Home} />
          <Route component={Error404} />
        </Switch>
      </Router>
    );
  }
}

export default App;
