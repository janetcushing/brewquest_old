import  React, {Component} from "react";
// import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyAwesomeReactComponent from '../components/MyAwesomeReactComponent';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
 
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941


const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class Login extends Component {
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
    {/* <h1>Login Page</h1>
    <p>
      Nunc pharetra finibus est at efficitur. Praesent sed congue diam. Integer
      gravida dui mauris, ut interdum nunc egestas sed. Aenean sed mollis diam.
      Nunc aliquet risus ac finibus porta. Nam quis arcu non lectus tincidunt
      fermentum. Suspendisse aliquet orci porta quam semper imperdiet. Praesent
      euismod mi justo, faucibus scelerisque risus cursus in. Sed rhoncus mollis
      diam, sit amet facilisis lectus blandit at.
    </p>
    <MuiThemeProvider>
    <MyAwesomeReactComponent />
  </MuiThemeProvider>
  <FlatButton
      label="Ok"
      primary={true}
      onTouchTap={this.handleRequestClose}
    /> */}
  </div>
);

  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div style={styles.container}>
        <Dialog
          open={this.state.open}
          title="Super Secret Password"
          actions={standardActions}
          onRequestClose={this.handleRequestClose}
        >
          1-2-3-4-5
        </Dialog>
        <h1>Material-UI</h1>
        <h2>example project</h2>
        <RaisedButton
          label="Super Secret Password"
          secondary={true}
          onTouchTap={this.handleTouchTap}
        />
      </div>
    </MuiThemeProvider>
  
);
}
}

export default Login;
