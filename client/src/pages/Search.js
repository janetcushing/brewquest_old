import React, { Component } from "react";
import Container from "../components/Container";
import Row from "../components/Row";
import Col from "../components/Col";
import SearchField from "../components/SearchField";
import ResultsCard from "../components/ResultsCard/ResultsCard";
import API from "../utils/API";
import { isLoggedIn } from '../utils/AuthService';


class Search extends Component {
  // Setting the component's initial state
  constructor(props, context) {
    super(props, context);

    this.state = {
      searchLocation: "",
      loggedIn: "",
      result: [],
      saved: []
    };
  }

  componentWillMount() {
    console.log(`in componentWillMount`);
    console.log(`isLoggedIn ${isLoggedIn()}`);
    this.setState({ 
      loggedIn: isLoggedIn() 
     });
   console.log(`this.state.loggedIn ${this.state.loggedIn}`);
    if (this.props.location.state) { 
      this.setState({ 
        searchLocation: this.props.location.state.searchLocation,
       });
    }
  }

  componentDidMount() {
    console.log(`in componentDidMount`);
    console.log(`isLoggedIn ${isLoggedIn()}`);
    this.setState({ 
      loggedIn: isLoggedIn() 
     });
    console.log(`this.state.loggedIn ${this.state.loggedIn}`);
    if (this.props.location.state) {
      console.log(`isLoggedIn ${isLoggedIn()}`);
      console.log("current state: " + this.state.searchLocation);
      console.log(`this.state.LoggedIn ${this.state.loggedIn}`);
      this.searchApiPlaces(this.state.searchLocation);
    }
  }

  searchApiPlaces = query => {
    console.log("Im in searchPlaces");
    console.log("/api/apiplaces" + query);
    console.log(`isLoggedIn ${isLoggedIn()}`);
    console.log(`this.state.LoggedIn ${this.state.loggedIn}`);
    API.getApiPlaces(query)
      .then(res => {
        if (res.data === "location error from geocoder.geocode") {
          alert("Please enter a valid location");
        } else {
          this.setState({
            result: res.data.placeDetails
          });
        }
      })
      .catch(err => console.log(err));
  };


  handleSearchLocationChange = event => {
    this.setState({ searchLocation: event.target.value });
    console.log(`this.state.LoggedIn ${this.state.loggedIn}`);
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(`isLoggedIn ${isLoggedIn()}`);
    console.log(`this.state.LoggedIn ${this.state.loggedIn}`);
    if (!this.state.searchLocation) {
      alert("Please add search criteria");
    } else {
      console.log(this.state.searchLocation);
      this.searchApiPlaces(this.state.searchLocation);
    }
  };



  handlePlacesSave = (event, details_key) => {
    event.preventDefault();
    console.log(`im in handlePlacesSave`);
    console.log("value", details_key);
    console.log(`isLoggedIn ${isLoggedIn()}`);
    console.log(`this.state.LoggedIn ${this.state.loggedIn}`);
    // console.log("key", this.result.details_key);
    // let detailsToSave = {
    //   brewery_id: this.state.result[details_key].brewery_id,
    //   brewery_name: this.state.result[details_key].brewery_name,
    //   full_address: this.state.result[details_key].full_address,
    //   icon: this.state.result[details_key].icon,
    //   latitude: this.state.result[details_key].lat,
    //   longitude: this.state.result[details_key].lng,
    //   num_reviews: this.state.result[details_key].num_reviews,
    //   phone: this.state.result[details_key].phone,
    //   place_id: this.state.result[details_key].place_id,
    //   price_level: this.state.result[details_key].price_level,
    //   rating: this.state.result[details_key].rating,
    //   website: this.state.result[details_key].website
    // }
    console.log(this.state.result[details_key]);
    API.savePlace(this.state.result[details_key]);
    console.log("saved the Result");
  };

  handlePlacesDelete = (event, details_key) => {
    event.preventDefault();
    console.log(`isLoggedIn ${isLoggedIn()}`);
    console.log(`this.state.LoggedIn ${this.state.loggedIn}`);
    console.log(`im in handlePlacesDelete`);
    console.log("value", details_key);
    // console.log("key", this.result.details_key);
    let breweryId = {
      brewery_id: this.state.results[details_key].brewery_id,
    }
    console.log(breweryId);
    API.deleteSavedPlaceByBreweryId(breweryId);
    console.log(`deleting  ${breweryId}`);
  };



  // removeFromResult = (i) => {
  //   console.log(`im in removeFromResult`);
  //   let results = this.state.result
  //   results.splice(i,1);
  //   this.setState({
  //     result: results
  //   });
  // }



  render() {

    return (
      <div>
        <Container>
          <Row>
            <Col size="sm-12">
              {/* <AppbarRow /> */}
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col size="sm-12">
            {"this.state.loggedIn: " + this.state.loggedIn}
              <SearchField
                handleSearchLocationChange={this.handleSearchLocationChange}
                handleFormSubmit={this.handleFormSubmit}
                searchLocation={this.state.searchLocation}
              />
            </Col>
          </Row>
        </Container>

        <Container>
          <Row>
            <Col size="sm-12">
              <ResultsCard
                results={this.state.result}
                handlePlacesSave={this.handlePlacesSave}
                handlePlacesDelete={this.handlePlacesDelete}
                loggedIn={this.state.loggedIn}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Search;