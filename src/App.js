import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import "./App.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"; // add

import Header from "./components/Header/Header";
import Welcome from "./components/Welcome/Welcome";
import Subscribe from "./components/Subscribe/Subscribe";

function App() {
  return (
    <MuiThemeProvider>
      <div className="App">
        <Header/>
        {/* <NavBar /> */}
        <div className="App-header">
          <Switch>
            <Route path="/" exact component={Welcome} />
            <Route path="/subscribe" exact component={Subscribe} />
          </Switch>
        </div>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
