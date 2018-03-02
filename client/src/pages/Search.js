import React, {Component} from "react";
import Container from "../components/Container";
import Row from "../components/Row";
import Col from "../components/Col";
import Panel from "../components/Panel";
import axios from "axios";
import ResultsCard from "../components/ResultsCard/ResultsCard";
import Nav from "../components/Nav";
import API_db from "../utils/API_db";


class Search extends Component {
  // Setting the component's initial state
  state = {
    searchLocation: "",
    result: [],
    saved: []
  };


  //  When this component mounts, get the saved articles to display
  componentDidMount() {
    console.log("in component did mount", this.state);
    this.loadSavedPlaces();
  }

  loadSavedPlaces = () => {
    console.log("in loadSavedPubs");
    console.log("state: ", this.state);
    // API_db.getSavedArticles()
    //   .then(result => {
    //     console.log("im about to display result");
    //     console.log(result.data[0]);
    //     console.log("state: ", this.state);
    //     const savedDetailsArray = [];
    //     result.data.forEach(function (element, i) {
    //       let details = {
    //         "details_key": i,
    //         "id": element._id,
    //         "title": element.title,
    //         "web_url": element.web_url,
    //         "pub_date": element.date_published,
    //         "snippet": element.snippet
    //       }
    //       savedDetailsArray.push(details);
    //       console.log("savedDetailsArray.length");
    //       console.log(savedDetailsArray.length);
    //     });
    //   this.setState({
    //     saved: savedDetailsArray
    //   });
    // }).catch(err => {
    //   console.log(`Caught an error in loadSavedArticles: ${err}`);
    // });
  }


  searchPlaces = query => {
    console.log("Im in searchPlaces");
    console.log("/api/places/" + query);
    axios.get("/api/places/" + query)
      .then(res => {
        if (res.data === "locaton error") {
          alert("Please enter a valid location");
        } else {
          console.log("im back from getting the api data");
          console.log(res);
          console.log(res.data.breweryDetails);
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


  
  handleBrewerySave = (event) => {
    event.preventDefault();
    console.log(`im in handleSave`);
    console.log("value", event.target.value)
    let detailsToSave = {
      name: this.state.result[event.target.value].name,
      brewery_id: this.state.result[event.target.value].brewery_id,
      icon: this.state.result[event.target.value].icon,
      lat: this.state.result[event.target.value].lat,
      lng: this.state.result[event.target.value].lng,
      place_id: this.state.result[event.target.value].place_id,
      rating: this.state.result[event.target.value].rating,
      full_address: this.state.result[event.target.value].full_address,
      phone: this.state.result[event.target.value].phone,
      num_reviews: this.state.result[event.target.value].num_reviews,
      website: this.state.result[event.target.value].website
    }
    console.log(detailsToSave);
    API_db.saveBrewery(detailsToSave);
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
        <Nav />
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