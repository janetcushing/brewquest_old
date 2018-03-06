import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { grey50 } from 'material-ui/styles/colors';
import { logout, isLoggedIn } from '../utils/AuthService';

const styles = {
  labelStyle: {
    color: grey50,
  }
};


class Logout extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.state = {
      open: false,
    };
  }

  handleRequestClose() {
    if (isLoggedIn()) {
      this.setState({
        open: false,
        loggedIn: true
      });
    } else
      this.setState({
        open: false,
        loggedIn: false
      });
  }

  handleTouchTap() {
    logout();
    if (isLoggedIn()) {
      this.setState({
        open: true,
        loggedIn: true
      });
    } else {
      this.setState({
        open: true,
        loggedIn: false
      });
    }
  }

  render() {

    return (
      <div>
        <FlatButton
          label="Logout"
          onTouchTap={this.handleTouchTap}
          labelStyle={styles.labelStyle}
        />
      </div>
    );
  }
}

export default Logout;