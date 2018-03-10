import React, { Component } from "react";
import { Redirect } from 'react-router';
import SearchField from "../components/SearchField";
import Nav from "../components/Nav";
import { isLoggedIn } from '../utils/AuthService';
import "../App.css";
import LocalDrink from 'material-ui/svg-icons/maps/local-drink';
import Check_circle from 'material-ui/svg-icons/action/check-circle';
import Thumb_up from 'material-ui/svg-icons/action/thumb-up';
import { grey50 } from 'material-ui/styles/colors';


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941

const styles = {
  smallIcon: {
    width: 36,
    height: 36,
    style: grey50
  },
  mediumIcon: {
    width: 48,
    height: 48,
  },
  largeIcon: {
    width: 60,
    height: 60,
  },
  small: {
    width: 72,
    height: 72,
    padding: 16,
  },
  medium: {
    width: 96,
    height: 96,
    padding: 24,
  },
  large: {
    width: 120,
    height: 120,
    padding: 30,
  },
};


class Home extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false,
      redirect: false,
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
    event.preventDefault();
    console.log(`isLoggedIn ${isLoggedIn()}`);
    // console.log("im in handleFormSubmit");
    if (!this.state.searchLocation) {
      alert("Please add search criteria");
    } else {
      this.setState({ redirect: true });
    }
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
    if (this.state.redirect) {
      return <Redirect to={{
        pathname: '/search',
        state: { searchLocation: this.state.searchLocation }
      }} />;
    }

    return (

      <div>
        <div id="home-page-background">
          <div id="searchPlacesDiv">
            <div id="title-div">
              <h2 id="beer-text">Where can I find a really good beer?</h2>
            </div>

            <br />

            <div id="search-field-div">
              <SearchField
                handleSearchLocationChange={this.handleSearchLocationChange}
                handleFormSubmit={this.handleFormSubmit}
                searchLocation={this.state.searchLocation} />
            </div>
          </div>
        </div>
        <div id="secondary-info">
          <div id="find-beer-home">
            <LocalDrink class="home-page-icon" style={styles.smallIcon}/>
            <h2>Find Beer</h2>
            <p>Search for places you can go to get a really good beer!</p>
          </div>
          <div id="save-places-home">
          <Check_circle class="home-page-icon" style={styles.smallIcon}/>
            <h2>Save Places</h2>
            <p>Save places you want to check out to your saved list!</p>
          </div>
          <div id="rate-places-home">
          <Thumb_up class="home-page-icon" style={styles.smallIcon}/>
            <h2>Rate Places</h2>
            <p>Rate the places you visit and see others' reviews.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;


