import React, {Component} from 'react';
import { Link } from "react-router-dom";
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import Person from 'material-ui/svg-icons/social/person';
import PersonOutline from 'material-ui/svg-icons/social/person-outline';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { grey50, grey800 } from 'material-ui/styles/colors';
// import { login, logout, isLoggedIn, getIdToken, decodeToken, clearIdToken, clearAccessToken } from '../../utils/AuthService';
import { login, logout, isLoggedIn, clearIdToken, clearAccessToken } from '../../utils/AuthService';
import FlatButton from 'material-ui/FlatButton';
import API from "../../utils/API";

const styles = {
    style: {
        background: grey800,
    },
    labelStyle: {
        color: grey50,
    },
    mediumIcon: {
        width: 48,
        height: 48,
        color: grey50
      }
};


 class Nav extends React.Component {

    constructor(props) {
        super(props);
        this.state = { open: false };
    }

    handleLogin = () => {
        console.log(`im in handleLogin`);
        login();
        // if (isLoggedIn()) {
            this.setState({ loggedIn: true });
           
           
        // } else { this.setState({ loggedIn: false }); }

    }

    // componentWillUnmount(){
    //     console.log("in componentWillUnmount");
 // let token = getIdToken();
//  let token = localStorage.getItem('id_token')
//  debugger
//  console.log(token);
//  let user = decodeToken(token);
//  console.log(user);
//  this.setState({ user: user });
//  console.log("im about to API.saveUser");
//  console.log(this.state.user);
//  setTimeout(function () {
//  API.saveUser(this.state.user)
//      .then(res => {
//          console.log("user added");
//      })
//      .catch(err => console.log(err));
//  }, 10000);
    // }

    handleLogout = () => {
        logout();
        console.log("i just logged out");
        clearIdToken();
        clearAccessToken();
      }

    handleToggle = () => this.setState({ open: !this.state.open });


    handleClose = () => {
        console.log(`nav bar isLoggedIn ${isLoggedIn()}`);
        if (isLoggedIn()) {
            this.setState({ open: false, loggedIn: true });
        } else {
            this.setState({ open: false, loggedIn: false });
        }
    }

    render() {
        return (
            <div>
                <div id="logoDiv">
                    <a href="/"><img id="logo" src={require(`../../images/logo.png`)} style={styles.logoStyle} /></a>
                </div>

                <div id="navBar">

                    <div id="navBtns">
                    {
                            (isLoggedIn()) ? <Person style={styles.iconStyle} style={styles.mediumIcon} iconStyle={styles.iconStyle} onClick={() => logout()} label="Logout" />
                                : (<PersonOutline style={styles.iconStyle} style={styles.mediumIcon} iconStyle={styles.iconStyle} onClick={() => login()} label="Login" />)
                        }
                        <NavigationMenu id="nav-menu" style={styles.iconStyle} style={styles.mediumIcon} iconStyle={styles.iconStyle} onClick={this.handleToggle} />
                    </div>

                    <Drawer id="drawer-container"
                        openSecondary={true}
                        docked={false}
                        width={200}
                        open={this.state.open}
                        onRequestChange={(open) => this.setState({ open })}
                    >
                        <Link to="/"><MenuItem onClick={this.handleClose}>Home</MenuItem></Link>
                        <Link to="/search"><MenuItem onClick={this.handleClose}>Search Places</MenuItem></Link>
                        {/* <Link to="/search"><MenuItem onClick={this.handleClose}>Search Beer</MenuItem></Link> */}
                        {
                            (isLoggedIn()) ? <Link to="/savedplaces">
                                <MenuItem onClick={this.handleClose}>My Saved Places</MenuItem>

                            </Link> : <Link to="/login"> </Link>

                        }

                        {
                            (isLoggedIn()) ? <MenuItem onClick={() => logout()}>Logout</MenuItem>
                                : (<MenuItem onClick={() => login()}>Login</MenuItem>)
                        }


                    </Drawer>

                    {/* <img src={require(`../../images/logo.png`)}/> */}
                </div>
            </div>
        );
    }
}

export default Nav;