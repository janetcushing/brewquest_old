import React, { Component } from "react";
import Container from "../components/Container";
import Row from "../components/Row";
import Col from "../components/Col";
import SearchField from "../components/SearchField";
import ResultsCard from "../components/ResultsCard/ResultsCard";
import API from "../utils/API";
import { isLoggedIn } from '../utils/AuthService';


class Search extends Component {
  
  constructor(props, context) {
    super(props, context);

    this.state = {
      searchLocation: "",
      loggedIn: "",
      result: [],
      user: {}
    };
  }

  componentWillMount() {
    if (this.props.location.state) {
      this.setState({
        searchLocation: this.props.location.state.searchLocation,
        user: this.props.location.state.user,
        loggedIn: this.props.location.state.loggedIn
      });
    }
  }

  componentDidMount() {
    this.setState({
      loggedIn: isLoggedIn()
    });
    if (this.props.location.state) {
      if (this.props.location.state.searchLocation) {
      this.searchApiPlaces(this.state.searchLocation);
      }
    }
  }

  searchApiPlaces = query => {
    API.getApiPlaces(query)
      .then(res => {
        if (res.data === "location error from geocoder.geocode") {
          alert("Please enter a valid location");
        } else {
          for (let i = 0; i < res.data.placeDetails.length; i++) {
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
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (!this.state.searchLocation) {
      alert("Please add search criteria");
    } else {
      this.setState({ searchLocation: "", results: [] })
      this.searchApiPlaces(this.state.searchLocation);
    }
  };


  handlePlacesSave = (event, details_key) => {
    event.preventDefault();
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
      } <Container >
          <Row >
            <Col size="sm-12" > {} 
            <SearchField handleSearchLocationChange={
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