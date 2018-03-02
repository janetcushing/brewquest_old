import React, { Component } from "react";
import SearchField from "../components/SearchField";





// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941


class Home extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.state = {
      open: false,
    };
  }

  

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  handleTouchTap() {
    this.setState({
      open: true,
    });
  }

  render() {

    return (
     
      <div>
        <div>
          <SearchField />
        </div>
        <div>
          <h2>Find Beer</h2>
          <p>Search for places you can go to get a really good beer!</p>
        </div>
        <div>
          <h2>Save Places</h2>
          <p>Save places you want to check out to your saved list!</p>
        </div>
        <div>
          <h2>Rate Places</h2>
          <p>Rate the places you visit and see others' reviews.</p>
        </div>
      </div>
    );
  }
}

export default Home;


