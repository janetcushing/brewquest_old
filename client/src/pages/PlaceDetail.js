import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../utils/API";
import Container from "../components/Container";

class Detail extends Component {
    state = {
      results: [],
      detail: []
    };

    componentWillMount() {
        if (this.props.location.state) {
            this.setState({ detail: this.props.location.state.placedetail }
            );
        }
    }

    // When this component mounts, grab the book with the _id of this.props.match.params.id
    // e.g. localhost:3000/books/599dcb67f0f16317844583fc
    componentDidMount() {  
        console.log(this.props.location.state)
        console.log("this is" + this.state.detail)
    }
  
    render() {
      return (
        <Container fluid>

                <h1>
                  {this.state.detail.brewery_name}
                </h1>

        </Container>
      );
    }
  }
  
  export default Detail;