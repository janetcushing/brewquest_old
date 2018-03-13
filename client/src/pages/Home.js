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
      loggedIn: false,
      user: {}
    };

    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
  }

  componentWillMount() {
    console.log(`in Home componentWillMount`);
    console.log(this.props.location.state);
    // if (this.props.location.state) {
      // console.log(this.props.location.state);
      // this.setState({
      //   loggedIn: this.props.location.state.loggedIn,
      //   user: this.props.location.state.user
      // });
    this.setState({
          loggedIn: true,
          user: {
            "given_name" : "Harry",
            "family_name" : "Cushing",
            "nickname" : "janet.cushing",
            "name" : "Janet Cushing",
            "picture" : "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg",
            "locale" : "en",
            "updated_at" : "2018-03-13T15:13:01.357Z",
            "iss" : "https://beer-quest.auth0.com/",
            "sub" : "google-oauth2|116410805633322351871",
            "aud" : "hBUrEY7ugr1dCF8SatxQiOnIVVW4c5ia",
            "iat" : "1520953981",
            "exp" : "1520989981",
            "at_hash" : "AqO_Oj5NVnKf1FfQmn3r5w",
            "nonce" : "OAGqPoR~tjXGnofJ8K1ngbCEkHXAoJet"
        }
        });

    // }

    console.log("Hello " + (this.state.user.given_name));
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
        state: {
          searchLocation: this.state.searchLocation,
          user: this.state.user,
          loggedIn: this.state.loggedIn
        }

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
            <div>
              <p id="beer-text">Hello {this.state.user.given_name}</p>
            </div>
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
            <LocalDrink className="home-page-icon" style={styles.smallIcon} />
            <h2>Find Beer</h2>
            <p>Search for places you can go to get a really good beer!</p>
          </div>
          <div id="save-places-home">
            <CheckCircle className="home-page-icon" style={styles.smallIcon} />
            <h2>Save Places</h2>
            <p>Save places you want to check out to your saved list!</p>
          </div>
          <div id="rate-places-home">
            <ThumbUp className="home-page-icon" style={styles.smallIcon} />
            <h2>Rate Places</h2>
            <p>Rate the places you visit and see others' reviews.</p>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;