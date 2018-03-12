import React from 'react';
// import Tabs from "../components/Tabs";
import FlatButton from 'material-ui/FlatButton';
// import Dialog from 'material-ui/Dialog';
import {grey50} from 'material-ui/styles/colors';
import { login, isLoggedIn, getIdToken, decodeToken } from '../utils/AuthService';


const styles = {
    labelStyle: {
      color: grey50,
    }
  };

  
  class Login extends React.Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleRequestClose = this.handleRequestClose.bind(this);
      this.handleTouchTap = this.handleTouchTap.bind(this);
      this.state = {
        open: false,
      };
    }
  
    handleLogin = () => {
      console.log(`im in handleLogin`);
      login();
      // if (isLoggedIn()) {
        //   this.setState({ loggedIn: true });
        //   let token = getIdToken();
        //   console.log(token);
        // let user = decodeToken(token);
        // console.log(user);
        // this.setState({ user: user });
        // console.log("im about to API.saveUser");
        // console.log(this.state.user);

        // setTimeout(function () {
        // API.saveUser(this.state.user)
        //     .then(res => {
        //         console.log("user added");
        //     })
        //     .catch(err => console.log(err));
        // }, 10000);
         
      // } else { this.setState({ loggedIn: false }); }

  }

    handleRequestClose() {
      this.setState({
        open: false,
      });
      
        
    }
  
    handleTouchTap() {
      login();
      this.setState({
        open: true,
      });
    }
  
    render() {
     
  
      return (
        <div>
            <FlatButton
              label="Login" 
              onTouchTap={this.handleTouchTap}
              labelStyle={styles.labelStyle}
              onClick={this.handleLogin}
            />
          </div>
      );
    }
  }
  
  export default Login;