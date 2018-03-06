import React from 'react';
import { Link } from "react-router-dom";
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import Login from "../Login";
import Logout from "../Logout";
import { grey50, grey800 } from 'material-ui/styles/colors';
import { login, logout, isLoggedIn } from '../../utils/AuthService';

const styles = {
    style: {
        background: grey800,
    }, 
    iconStyle: {
        iconStyle: grey50,
    }
};

export default class Nav extends React.Component {

    constructor(props) {
        super(props);
        this.state = { open: false };
    }

    handleToggle = () => this.setState({ open: !this.state.open });

    handleClose = () => 
    {
       if (isLoggedIn()){
        this.setState({ open: false, LoggedIn: true });
       } else {
        this.setState({ open: false, LoggedIn: false });
       }
}

    render() {
        return (

            <div>
                <AppBar
                    title={<span style={styles.title}>Brew Quest</span>}
                    style={styles.style}
                    // showMenuIconButton={false}
                    iconElementLeft={<IconButton><img src="../../../images/logo.png" alt="logo" /></IconButton>}
                    iconElementRight={
                        <div>
                           {
                           (isLoggedIn()) ? <Logout /> : <Login/>
                           }
                            <IconButton onClick={this.handleToggle}><NavigationMenu style={styles.iconStyle} /></IconButton>
                        </div>
                    }
                >
                </AppBar>
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
                        </Link> :  <Link to="/login"> </Link> 
                    }

                    {
                        (isLoggedIn()) ? <MenuItem onClick={() => logout()}>Logout</MenuItem>
                            : (<button className="btn btn-info log" onClick={() => login()}>LogIn</button>)
                    }
                     
                        
                    
                </Drawer>
            </div>
        );
    }
}