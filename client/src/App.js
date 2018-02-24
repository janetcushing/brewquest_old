
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navpills from "./components/Navpills";
import Home from "./pages/Home";
import About from "./pages/About";
import Search from "./pages/Search";


const App = () =>
  <Router>
    <div>
      <Navpills />
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/search" component={Search} />
    </div>
  </Router>;

export default App;

