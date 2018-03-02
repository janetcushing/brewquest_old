import React from 'react';
import Tabs from "../components/Tabs";
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

  
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
            <RaisedButton
              label="Login"
              secondary={true}
              onTouchTap={this.handleTouchTap}
            />
          </div>
      );
    }
  }
  
  export default Login;