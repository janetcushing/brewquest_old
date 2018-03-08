import React from 'react';
import { Link } from "react-router-dom";
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import Drawer from 'material-ui/Drawer';
// import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import Login from "../Login";
import Logout from "../Logout";
import { grey50, grey800 } from 'material-ui/styles/colors';
import { login, logout, isLoggedIn, getIdToken } from '../../utils/AuthService';
import FlatButton from 'material-ui/FlatButton';

const styles = {
    style: {
        background: grey800,
    },
    iconStyle: {
        color: grey50,
    },
    labelStyle: {
        color: grey50,
    },
    logoStyle: {
        width: '100px'
    }
};

// var token;

export default class Nav extends React.Component {

    constructor(props) {
        super(props);
        this.state = { open: false };
    }

    // handleLogin = () => {
    //     console.log(`im in handleLogin`);
    //     login();

    // }

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
                    <img id="logo" src={require(`../../images/logo.png`)} style={styles.logoStyle} />
                </div>

                <div id="navBar">

                    <div id="navBtns">
                        {
                            (isLoggedIn()) ? <FlatButton labelStyle={styles.labelStyle} onClick={() => logout()} label="Logout" />
                                : (<FlatButton labelStyle={styles.labelStyle} onClick={() => login()} label="Login" />)
                        }
                        <IconButton iconStyle={styles.iconStyle} onClick={this.handleToggle}><NavigationMenu style={styles.iconStyle} /></IconButton>
                    </div>

                    <Drawer
                        openSecondary={true}
                        docked={false}
                        width={200}
                        open={this.state.open}
                        onRequestChange={(open) => this.setState({ open })}
                    >
                        <Link to="/"><MenuItem onClick={this.handleClose}>Home</MenuItem></Link>
                        <Link to="/search"><MenuItem onClick={this.handleClose}>Search Places</MenuItem></Link>
                        <Link to="/search"><MenuItem onClick={this.handleClose}>Search Beer</MenuItem></Link>
                        {
                            (isLoggedIn()) ? <Link to="/savedplaces">
                                <MenuItem onClick={this.handleClose}>My Places &amp; Beers</MenuItem>

                            </Link> : <Link to="/login"> </Link>

                        }

                        {
                            (isLoggedIn()) ? <MenuItem onClick={() => logout()}>Logout</MenuItem>
                                : (<button className="btn btn-info log" onClick={() => login()}>LogIn</button>)
                        }


                    </Drawer>

                    {/* <img src={require(`../../images/logo.png`)}/> */}
                </div>
            </div>
        );
    }
}