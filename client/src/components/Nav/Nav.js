import React from 'react';
import { Link } from "react-router-dom";
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';

export default class Nav extends React.Component {

    constructor(props) {
        super(props);
        this.state = { open: false };
    }

    handleToggle = () => this.setState({ open: !this.state.open });

    handleClose = () => this.setState({ open: false });

    render() {
        return (
            <div>

                <AppBar
                    showMenuIconButton={false}
                    iconElementRight={<IconButton onClick={this.handleToggle}><NavigationMenu /></IconButton>}
                />
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
                    <Link to="/savedplaces"><MenuItem onClick={this.handleClose}>My Places &amp; Beers</MenuItem></Link>
                    <MenuItem onClick={this.handleClose}>Logout</MenuItem>

                </Drawer>
            </div>
        );
    }
}