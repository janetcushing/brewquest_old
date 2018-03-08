import React, { Component } from "react";
import { setIdToken, setAccessToken } from '../utils/AuthService';

class Callback extends Component {

  constructor() {
    super()
  }

  componentDidMount() {
      console.log("im in callback componentDidMount");
    setAccessToken();
    setIdToken();
    window.location.href = "/";
  }

  render() {
    return null;
  }
}

export default Callback;