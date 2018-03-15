import React, {
  Component
} from "react";
import Container from "../components/Container";
import Row from "../components/Row";
import Col from "../components/Col";
import SearchField from "../components/SearchField";
import ResultsCard from "../components/ResultsCard/ResultsCard";
import API from "../utils/API";
import {
  isLoggedIn
} from '../utils/AuthService';


class Search extends Component {
  // Setting the component's initial state
  constructor(props, context) {
    super(props, context);

    this.state = {
      searchLocation: "",
      loggedIn: "",
      result: [],
      saved: [],
      user: {}
    };
  }

  componentWillMount() {
    console.log(`in search componentWillMount`);
    // console.log(`state: ${JSON.stringify(this.state)}`);
    // this.setState({
    //   loggedIn: isLoggedIn()
    // });
    if (this.props.location.state) {
      this.setState({
        searchLocation: this.props.location.state.searchLocation,
        user: this.props.location.state.user,
        loggedIn: this.props.location.state.loggedIn
      });
      console.log(`search on: ${this.state.searchLocation}`);
      console.log(`user: ${JSON.stringify(this.state.user)}`);
      console.log(`loggedIn: ${this.state.loggedIn}`);
    }
    console.log(`state: ${JSON.stringify(this.state)}`);
    console.log(`search on: ${this.state.searchLocation}`);
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
      console.log(`search on: ${this.state.searchLocation}`);
      console.log(`user: ${this.state.user}`);
      console.log(`loggedIn: ${this.state.loggedIn}`);
      if (this.props.location.state.searchLocation) {
      this.searchApiPlaces(this.state.searchLocation);
      }
    }
  }

  searchApiPlaces = query => {
    console.log("Im in searchPlaces");
    console.log(`query: ${query}`);
    console.log(`isLoggedIn ${isLoggedIn()}`);
    console.log(`this.state.LoggedIn ${this.state.loggedIn}`);
    console.log(`going to API.getApiPlaces query ${query}`);
    API.getApiPlaces(query)
      .then(res => {
        if (res.data === "location error from geocoder.geocode") {
          alert("Please enter a valid location");
        } else {
          for (let i = 0; i < res.data.placeDetails.length; i++) {
            console.log(res.data.placeDetails[i].brewery_name);
            console.log(res.data.placeDetails[i].saved);
            console.log(res.data.placeDetails[i].phone);
            console.log(res.data.placeDetails[i].website);
          }
          this.setState({
            result: res.data.placeDetails
          });
        }
      })
      .catch(err => console.log(err));
  };


  handleSearchLocationChange = event => {
    this.setState({
      searchLocation: event.target.value
    });
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
      this.setState({ searchLocation: "", results: [] })
      this.searchApiPlaces(this.state.searchLocation);
    }
  };


  handlePlacesSave = (event, details_key) => {
    event.preventDefault();
    console.log(`im in handlePlacesSave`);
    let holdResult = this.state.result;
    holdResult[details_key].saved = true;
    this.setState({
      result: holdResult
    });
    API.savePlace(this.state.result[details_key])
      .then(res =>
        this.searchApiPlaces(this.state.searchLocation));
  };

  handlePlacesDelete = (event, details_key) => {
    event.preventDefault();
    console.log(`im in handlePlacesDelete`);
    console.log(`isLoggedIn ${isLoggedIn()}`);
    console.log(`this.state.LoggedIn ${this.state.loggedIn}`);
    // let holdResult = this.state.result;
    // holdResult[details_key].saved = false;
    // this.setState({
    //   result: holdResult
    // });
    let breweryId = this.state.result[details_key].brewery_id;
    API.deleteSavedPlaceByBreweryId(breweryId)
      .then(res => {
        this.searchApiPlaces(this.state.searchLocation);
      });
  }

  render() {

    return (<
      div id="search-page-background" >
      <div class="main-container" > {
        /* <div>
                    <p id="beer-text">Hello {this.state.user.name}</p>
                </div> */
      } <Container >
          <Row >
            <Col size="sm-12" > { /* {"this.state.loggedIn: " + this.state.loggedIn} */} <
              SearchField handleSearchLocationChange={
                this.handleSearchLocationChange
              }
              handleFormSubmit={
                this.handleFormSubmit
              }
              searchLocation={
                this.state.searchLocation
              }
            />
            </Col>
          </Row>
        </Container>

        <Container id="results-card-container" >
          <Row >
            <Col size="sm-12" >
              <ResultsCard results={
                this.state.result
              }
                handlePlacesSave={
                  this.handlePlacesSave
                }
                handlePlacesDelete={
                  this.handlePlacesDelete
                }
                loggedIn={
                  this.state.loggedIn
                }
              />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
    );
  }
}

export default Search;