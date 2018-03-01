
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Navpills from "./components/Navpills";
import Home from "./pages/Home";
import About from "./pages/About";
import Search from "./pages/Search";
import Login from "./pages/Login";
// import Dropdown from "./components/Dropdown";




const App = () =>
  <MuiThemeProvider>
    <Router>
      <div>
        <Navpills />
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/login" component={Login} />
      </div>
    </Router>
  </MuiThemeProvider>;

export default App;

