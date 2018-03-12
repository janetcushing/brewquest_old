import React, { Component } from 'react';
import loading from './loading.svg';
import { setAccessToken, setIdToken, decodeToken, getTokenExpirationDate } from '../../utils/AuthService';
import API from "../../utils/API";

class Callback extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log("im in callback componentDidMount");
    let accessToken = setAccessToken();
    let token = setIdToken();
    console.log(token);
    // let token = localStorage.getItem('id_token')
    let exp = getTokenExpirationDate(token);
    console.log(exp)

    let user = decodeToken(token);
    console.log(user);
    this.setState({ user: user });

    console.log("this.state.user:");
    console.log(this.state.user);
    console.log(user);
    
    console.log("im about to API.findUser");
    console.log(user.name);
    debugger
    let userName = user.name;
    API.findUser(userName)
      .then(res => {
        console.log(`res: `);
        console.log(res);
        debugger
        if (res.name) {
          
          console.log("user is there");
        } else {
          console.log("user is not there");
          console.log("im about to API.saveUser");
          debugger
          API.saveUser(user)
            .then(resp => {
              debugger
              console.log(resp);
              console.log("user added");
            })
            .catch(err => console.log(err));
        }

      })
      .catch(err => console.log(err));

    window.location.href = "/";
  }

  render() {
    const style = {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      height: '100vh',
      width: '100vw',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
    }

    return (

      <div style={style}>
        <img src={loading} alt="loading" />
      </div>
    )
  }
}

export default Callback;