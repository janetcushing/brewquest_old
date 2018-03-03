import React from 'react';
import Tabs from "../components/Tabs";
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import {grey50} from 'material-ui/styles/colors';

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
  
    handleRequestClose() {
      this.setState({
        open: false,
      });
    }
  
    handleTouchTap() {
      this.setState({
        open: true,
      });
    }
  
    render() {
      const standardActions = (
        <div>
          <Tabs></Tabs>
          <FlatButton
            label="Ok"
            primary={true}
            onTouchTap={this.handleRequestClose}
          />
        </div>
      );
  
      return (
        <div>
            <Dialog
              open={this.state.open}
              actions={standardActions}
              onRequestClose={this.handleRequestClose}
            >
            </Dialog>
            <FlatButton
              label="Login"
              onTouchTap={this.handleTouchTap}
              labelStyle={styles.labelStyle}
            />
          </div>
      );
    }
  }
  
  export default Login;