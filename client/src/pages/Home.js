import React, { Component } from "react";
import SearchField from "../components/SearchField";
import "../App.css";
import { isLoggedIn } from '../utils/AuthService';


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941


class Home extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false,
      searchLocation: "",
      loggedIn: ""
    };

    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
  }

  handleSearchLocationChange = event => {
    this.setState({ searchLocation: event.target.value });
    console.log(`isLoggedIn ${isLoggedIn()}`);
  };

  handleFormSubmit = event => {
    console.log(`isLoggedIn ${isLoggedIn()}`);
    // console.log("im in handleFormSubmit");
    // event.preventDefault();
    // if (!this.state.searchLocation) {
    //   alert("Please add search criteria");
    // }
    // console.log(this.state.searchLocation);
    // this.setState({
    //   searchLocation: this.state.searchLocation
    // });
    // console.log("I just set the state");
    // this.searchPlaces(this.state.searchLocation);
  };

  handleRequestClose() {
    console.log(`isLoggedIn ${isLoggedIn()}`);
    this.setState({
      open: false,
    });
  }

  handleTouchTap() {
    console.log(`isLoggedIn ${isLoggedIn()}`);
    this.setState({
      open: true,
    });
  }

  render() {

    return (

      <div>
        <div id="home-page-background">
          <div id="title-div">
            <h2 id="beer-text">Where can I find a really good beer?</h2>
          </div>
          <div id="search-field-div">
            <SearchField/>
          </div>
        </div>
        <div id="secondary-info">
          <div id="find-beer-home">
            <h2>Find Beer</h2>
            <p>Search for places you can go to get a really good beer!</p>
          </div>
          <div id="save-places-home">
            <h2>Save Places</h2>
            <p>Save places you want to check out to your saved list!</p>
          </div>
          <div id="rate-places-home">
            <h2>Rate Places</h2>
            <p>Rate the places you visit and see others' reviews.</p>
          </div>
        </div>
        <div id="footer">
          <p>Brew Quest</p>
        </div>
      </div>
    );
  }
}

export default Home;


