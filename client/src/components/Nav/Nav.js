import React from 'react';
import { Link } from "react-router-dom";
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { grey50, grey800 } from 'material-ui/styles/colors';
import { login, logout, isLoggedIn, getIdToken } from '../../utils/AuthService';
import FlatButton from 'material-ui/FlatButton';

const styles = {
    style: {
        background: grey800,
    },
    labelStyle: {
        color: grey50,
    },
    smallIcon: {
        width: 36,
        height: 36,
        color: grey50
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
                    <a href="/"><img id="logo" src={require(`../../images/logo.png`)} style={styles.logoStyle} /></a>
                </div>

                <div id="navBar">

                    <div id="navBtns">
                        {
                            (isLoggedIn()) ? <FlatButton labelStyle={styles.labelStyle} onClick={() => logout()} label="Logout" />
                                : (<FlatButton labelStyle={styles.labelStyle} onClick={() => login()} label="Login" />)
                        }
                        <NavigationMenu id="nav-menu" style={styles.iconStyle} style={styles.smallIcon} iconStyle={styles.iconStyle} onClick={this.handleToggle}/>
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