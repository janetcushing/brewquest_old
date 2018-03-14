// import React, { Component } from 'react';
import React from 'react';
import { Link } from "react-router-dom";
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { grey50, grey800 } from 'material-ui/styles/colors';
import { login, logout, isLoggedIn, 
     getUserName, getUserAud } from '../../utils/AuthService';
import FlatButton from 'material-ui/FlatButton';
import Person from 'material-ui/svg-icons/social/person';
import PersonOutline from 'material-ui/svg-icons/social/person-outline';


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
        this.state = {
            open: false,
            loggedIn: false,
            user: {}
        };
    }


    componentWillMount() {
               console.log(`in Nav componentWillMount`);
               debugger
            
                if (isLoggedIn()) {
                    console.log("is logged in");
                    debugger
                    let userName = getUserName();
                    let userAud = getUserAud();
                    let userData = {name: userName, aud: userAud};
                    this.setState({ user: userData });
                    this.setState({ loggedIn: true });
                    debugger
                    console.log(this.state.user.name);
                    console.log(this.state.user.loggedIn);
    
                } else { 
                    this.setState({ loggedIn: false });
                    console.log("not logged in");
                    console.log(this.state.user.loggedIn);
                 }
            
                // console.log(this.props.location.state);
            // this.setState({
            //     loggedIn: true,
            //     user: {
            //       "given_name" : "Harry",
            //       "family_name" : "Cushing",
            //       "nickname" : "janet.cushing",
            //       "name" : "Janet Cushing",
            //       "picture" : "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg",
            //       "locale" : "en",
            //       "updated_at" : "2018-03-13T15:13:01.357Z",
            //       "iss" : "https://beer-quest.auth0.com/",
            //       "sub" : "google-oauth2|116410805633322351871",
            //       "aud" : "hBUrEY7ugr1dCF8SatxQiOnIVVW4c5ia",
            //       "iat" : "1520953981",
            //      "exp" : "1520989981",
            //       "at_hash" : "AqO_Oj5NVnKf1FfQmn3r5w",
            //       "nonce" : "OAGqPoR~tjXGnofJ8K1ngbCEkHXAoJet"
            //   }
            //   });
        
              console.log("Hello " + (this.state.user.name));
              console.log("loggedIn " + (this.state.user.loggedIn));
            }
        
    handleLogin = () => {
        console.log(`im in handleLogin`);
        try {
            login();
        } catch (err) {
            console.log(`error logging in: ${err}`);
            alert("There was an error logging in");
        // } finally {
        //     debugger
        //     if (isLoggedIn()) {
        //         console.log("is logged in");
        //         debugger
        //         let userName = getUserName();
        //         let userAud = getUserAud();
        //         let userData = {name: userName, aud: userAud};
        //         this.setState({ user: userData });
        //         this.setState({ loggedIn: true });
        //         debugger
        //         console.log(this.state.user.name);
        //         console.log(this.state.user.loggedIn);

        //     } else { 
        //         this.setState({ loggedIn: false });
        //         console.log("not logged in");
        //         console.log(this.state.user.loggedIn); }
        }
    }


    handleLogout = () => {
        try {
            logout();
            console.log("i just logged out");
            // clearIdToken();
            // clearAccessToken();
            // clearUser();
        } catch (err) {
            console.log(`error logging in: ${err}`);
            alert("There was an error logging out");
        } finally {
            if (isLoggedIn()) {
                debugger
                console.log("in handleLogout i am still logged in");
                this.setState({ loggedIn: true });
            } else {
                 this.setState({ loggedIn: false }); 
                 this.setState({ user: {} }); 
                }
        }
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
                        <a href="/"><img id="logo" src={require(`../../images/logo.png`)} style={styles.logoStyle} alt="logo" /></a>
                    </div>

                    <div id="navBar">

                        <div id="navBtns">
                            {
                                (this.state.loggedIn) ?
                                // (isLoggedIn()) ?
                                <Person style={styles.iconStyle} style={styles.mediumIcon} iconStyle={styles.iconStyle} onClick={() => logout()} label="Logout" />
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
                            <Link to={{
                                pathname: "/",
                                state: { user: this.state.user, loggedIn: this.state.loggedIn }
                            }}
                            ><MenuItem onClick={this.handleClose}>Home</MenuItem>
                            </Link>
                            <Link to={{
                                pathname: "/search",
                                state: { user: this.state.user, loggedIn: this.state.loggedIn }
                            }}>
                                <MenuItem onClick={this.handleClose}>Search Places</MenuItem>
                            </Link>
                            {/* <Link to="/search"><MenuItem onClick={this.handleClose}>Search Beer</MenuItem></Link> */}
                            {
                                // (isLoggedIn()) ?
                                (this.state.loggedIn) ?
                                    <Link to={{
                                        pathname: "/savedplaces",
                                        state: { user: this.state.user, loggedIn: this.state.loggedIn }
                                    }} >
                                        <MenuItem onClick={this.handleClose}>My Saved Places</MenuItem>

                                    </Link>
                                    :
                                    <Link to="/login"> </Link>

                            }

                            {
                                // (isLoggedIn()) ? 
                                (this.state.loggedIn) ?
                                <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                                    : (<MenuItem onClick={this.handleLogin}>Login</MenuItem>)
                            }


                        </Drawer>

                        {/* <img src={require(`../../images/logo.png`)}/> */}
                    </div>
                </div>
            );
        }
    }

    export default Nav;