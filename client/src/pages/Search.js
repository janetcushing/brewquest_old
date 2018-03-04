import React, {Component} from "react";
import Container from "../components/Container";
import Row from "../components/Row";
import Col from "../components/Col";
import Panel from "../components/Panel";
import ResultsCard from "../components/ResultsCard/ResultsCard";
import API from "../utils/API";
// import API_db from "../utils/API_db";


class Search extends Component {
  // Setting the component's initial state
  state = {
    searchLocation: "",
    result: [],
    saved: []
  };



  searchPlaces = query => {
    console.log("Im in searchPlaces");
    console.log("/api/findbrewery/" + query);
 
    API.getPlaces(query)
      .then(res => {
        if (res.data === "location error from geocoder.geocode") {
          alert("Please enter a valid location");
        } else {
          this.setState({
            result: res.data.breweryDetails
          });
        }
      })
      .catch(err => console.log(err));
  };


  handleInputChange = event => {
    const {name,value} = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    console.log("im in handleFormSubmit");
    event.preventDefault();
    if (!this.state.searchLocation) {
      alert("Please add search criteria");
    }
    console.log(this.state.searchLocation);
    this.setState({
      searchLocation: this.state.searchLocation
    });
    console.log("I just set the state");
    this.searchPlaces(this.state.searchLocation);
  };


  
  handleBrewerySave = (event, details_key) => {
    event.preventDefault();
    console.log(`im in handleBrewerySave`);
    console.log("value", details_key);
    // console.log("key", this.result.details_key);
    let detailsToSave = {
      brewery_id: this.state.result[details_key].brewery_id,
      brewery_name: this.state.result[details_key].brewery_name,
      full_address: this.state.result[details_key].full_address,
      icon: this.state.result[details_key].icon,
      latitude: this.state.result[details_key].lat,
      longitude: this.state.result[details_key].lng,
      num_reviews: this.state.result[details_key].num_reviews,
      phone: this.state.result[details_key].phone,
      place_id: this.state.result[details_key].place_id,
      price_level:  this.state.result[details_key].price_level,
      rating: this.state.result[details_key].rating,
      website: this.state.result[details_key].website
    }
    console.log(detailsToSave);
    API.saveBrewery(detailsToSave);
    console.log("savedResult");
    // this.loadSavedArticles();
  };


  // removeFromResult = (i) => {
  //   console.log(`im in removeFromResult`);
  //   let results = this.state.result
  //   results.splice(i,1);
  //   this.setState({
  //     result: results
  //   });
  // }

  // handleRemove = (event) => {
  //   console.log(`im in handleSave`);
  //   console.log("value", event.target.value)
  //   event.preventDefault();
  //   let id = event.target.value;
  //   console.log(`im in handleRemove ${id}`);
  //   API_db.deleteSavedArticle(id);
  //   this.loadSavedArticles();
  // };


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
              <Panel>
                <div>
                  <form className="form" >
                    <label htmlform="search" ></label>
                    <input value={this.state.searchLocation}
                      name="searchLocation"
                      onChange={this.handleInputChange}
                      type="text"
                      placeholder="Current Location Zip Code" />
                    <button id="searchLocationBtn"
                      onClick={this.handleFormSubmit}
                      className="btn btn-primary" >
                      SEARCH
                    </button>
                  </form>
                </div>
              </Panel>
            </Col>
          </Row>
        </Container>

        <Container>
          <Row>
            <Col size="sm-12">
              <ResultsCard
                results={this.state.result}
                handleBrewerySave = {this.handleBrewerySave}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Search;