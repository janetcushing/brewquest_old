import React, { Component } from "react";
// import ReactDOM from 'react-dom';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import MyAwesomeReactComponent from '../components/MyAwesomeReactComponent';
// import RaisedButton from 'material-ui/RaisedButton';
// import Dialog from 'material-ui/Dialog';
// import { deepOrange500 } from 'material-ui/styles/colors';
// import { green100, green500, green700 } from 'material-ui/styles/colors';
// import FlatButton from 'material-ui/FlatButton';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Container from "../components/Container";
import Row from "../components/Row";
import Col from "../components/Col";
import Panel from "../components/Panel";
// import axios from "axios";
// import API_db from "../utils/API_db";
// import ArticleDetail from "./ArticleDetail";
import AppbarRow from "../components/AppbarRow";


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
    console.log("Im in searchPlaces")



    // const query1 = ({
    //   'q': this.state.search,
    //   'begin_date': beginDate,
    //   'end_date': endDate
    // });
    // console.log("query1: ");
    // console.log(query1);
    // API.search(query)
    //   .then(res => this.setState({ result: res.data }))
    //   .catch(err => console.log(err));
    // let url =
    //   "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
    // url += "apikey=c0b4d2e16a014795bbdce9d7e4df8a95";
    // url += "&q=" + query1.q;
    // if (query1.begin_date) {
    //   url += "&begin_date=" + query1.begin_date;
    // }
    // if (query1.end_date) {
    //   url += "&end_date=" + query1.end_date;
    // }
    // // url += "fl=web_url,snippet,pub_date,headline,_id";
    // console.log(`url: ${url}`);
    // axios
    //   .get(url)
    //   .then(response => {
    //     console.log(`came back successfully`);
    //     const detailsArray = [];

    //     response.data.response.docs.forEach(function (element, i) {
    // //       let details = {
    //         "details_key": i,
    //         "title": response.data.response.docs[i].headline.main,
    //         "web_url": response.data.response.docs[i].web_url,
    //         "pub_date": response.data.response.docs[i].pub_date,
    //         "snippet": response.data.response.docs[i].snippet
    //   //     }
    //     detailsArray.push(details);
    //     console.log("detailsArray.length");
    //     console.log(detailsArray.length);
    //   });
    //   this.setState({
    //     result: detailsArray
    //   });
    // })
    // .catch(error => {
    //   console.log(error);
    // });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
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



  handleSave = (event) => {
    event.preventDefault();
    console.log(`im in handleSave`);
    // console.log("value", event.target.value)
    // let i = event.target.value; 
    // let detailsToSave = {
    //   title: this.state.result[event.target.value].title,
    //   web_url: this.state.result[event.target.value].web_url,
    //   snippet: this.state.result[event.target.value].snippet,
    //   pub_date: this.state.result[event.target.value].pub_date
    // }
    // console.log(detailsToSave);
    // API_db.saveArticle(detailsToSave);
    // console.log("savedResult");
    // this.removeFromResult(i);
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
                    <label htmlform="search" > Search Location: </label>
                    <input value={this.state.searchLocation}
                      name="searchLocation"
                      onChange={this.handleInputChange}
                      type="text"
                      placeholder="Current Location" />
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
              <Panel heading="RESULTS">
              </Panel>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Search;
