import React, { Component } from "react";
import { Redirect } from 'react-router';
import SearchField from "../components/SearchField";
import { isLoggedIn } from '../utils/AuthService';
import "../App.css";
import LocalDrink from 'material-ui/svg-icons/maps/local-drink';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import { grey50 } from 'material-ui/styles/colors';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941

const styles = {
  smallIcon: {
    width: 36,
    height: 36,
    color: grey50
  },
};



class Home extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false,
      redirect: false,
      searchLocation: "",
      loggedIn: "",
      user:{}
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
            <LocalDrink class="home-page-icon" style={styles.smallIcon} />
            <h2>Find Beer</h2>
            <h4>Search for places you can go to get a really good beer!</h4>
          </div>
          <div id="save-places-home">
            <CheckCircle class="home-page-icon" style={styles.smallIcon} />
            <h2>Save Places</h2>
            <h4>Save places you want to check out to your saved list!</h4>
          </div>
          <div id="rate-places-home">
            <ThumbUp class="home-page-icon" style={styles.smallIcon} />
            <h2>Rate Places</h2>
            <h4>Rate the places you visit and see others' reviews.</h4>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;