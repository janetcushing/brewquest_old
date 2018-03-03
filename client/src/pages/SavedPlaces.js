import React, { Component } from "react";
import Container from "../components/Container";
import Row from "../components/Row";
import Col from "../components/Col";
// import DeleteBtn from "../components/DeleteBtn";
import API from "../utils/API";
// import { Link } from "react-router-dom";
import { SavedListItem, SavedList } from "../components/SavedPlacesList";
import Clear from 'material-ui/svg-icons/content/clear';


class SavedPlaces extends Component {
  state = {
    results: []
  };

  componentDidMount() {
    console.log("component did mount", this.state.results)
    this.loadSavedPlaces();
  }

  loadSavedPlaces = () => {
    API.getSavedPlaces()
      .then(res =>
        this.setState({ results: res.data })
        // console.log("saved places", res.data)
      )
      .catch(err => console.log(err));
  };

  deletePlace = id => {
    API.deleteSavedPlace(id)
      .then(res => this.loadSavedPlaces())
      .catch(err => console.log(err));
  };

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
          {this.state.results.length ? (
            <SavedList>
              {this.state.results.map(result => {
                  return (
                    <SavedListItem key={result._id}>
                    <a href={result.website}>{result.brewery_name}</a>
                      <Clear onClick={() => this.deletePlace(result._id)}/>
                    </SavedListItem>
                  );
                })}
             </SavedList>
            ) : (
              <h3>No Saved Breweries Yet</h3>
            )}
        </Container>
      </div>
    );
  }
}

export default SavedPlaces;
