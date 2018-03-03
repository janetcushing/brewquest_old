import React, { Component } from "react";
import Container from "../components/Container";
import Row from "../components/Row";
import Col from "../components/Col";
import DeleteBtn from "../components/DeleteBtn";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { SavedListItem, SavedList } from "../components/SavedPlacesList";


class SavedPlaces extends Component {
  state = {
    results: [1, 2, 3, 4, 5]
  };

  // componentDidMount() {
  //   console.log("in component did mount", this.state);
  //   this.loadSavedPlaces();
  // }

  loadSavedPlaces = () => {
    API.getSavedPlaces()
      .then(res =>
        this.setState({ results: res.data })
      )
      .catch(err => console.log(err));
  };

  deletePlace = id => {
    API.deletePlace(id)
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
                  {this.state.results ? (
                  <SavedList>
                    {this.state.results.map(result => {
                      return (
                        <SavedListItem key={result._id}>
                        <h1>{result.name}</h1>
                        <DeleteBtn />
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
