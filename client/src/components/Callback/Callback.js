import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import loading from './loading.svg';
import { setIdToken, decodeToken, getTokenExpirationDate, clearIdToken, clearAccessToken, setUser } from '../../utils/AuthService';
import API from "../../utils/API";

class Callback extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      redirect: false,
      user: {}
    };
  }

  componentDidMount() {
    console.log("im in callback componentDidMount");
    // let accessToken = setAccessToken();
    let token = setIdToken();
    console.log(token);
    // let token = localStorage.getItem('id_token')
    let exp = getTokenExpirationDate(token);
    console.log(exp)

    let user = decodeToken(token);
    console.log(user);
    this.setState({ user: user });
    this.setState({ loggedIn: true });
    debugger
    console.log("this.state.user:");
    console.log(this.state.user);
    console.log(user);

    console.log("im about to API.findUser");
    console.log(user.aud);
    debugger
    let userAud = user.aud;
    API.findUser(userAud)
      .then(res => {
        console.log(`res: `);
        console.log(res);
        if (res.aud) {
          console.log("user is there");
        } else {
          console.log("user is not there");
          console.log("im about to API.saveUser");
          let userData = user;
          // userData.loggedIn = true;
          API.saveUser(userData)
            .then(resp => {
              console.log(resp);
              console.log("user added");
            })
            .catch(err => console.log(err));
        }

      })
    console.log("clearing tokens");
    setUser(user) ;
    clearIdToken();
    clearAccessToken();
    this.setState({ redirect: true });
    // .catch(err => console.log(err));

    // window.location.href = "/";
    // window.location.href = window.location.origin;
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

    if (this.state.redirect) {
      return <Redirect to={{
        pathname: '/',
        state: {
          user: this.state.user,
          loggedIn: this.state.loggedIn
        }
      }} />;
    }


    return (

      <div style={style}>
        <img src={loading} alt="loading" />
      </div>

    )
  }
}

export default Callback;