import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {blue50, grey50, grey900} from 'material-ui/styles/colors';

const styles = {
    hintStyle: {
      color: blue50,
    },
    buttonStyle: {
        backgroundColor: grey50,
        labelColor: grey900,
      }
  };
  

const SearchField = () => (
    <div>
        <TextField
            name="SearchforPlaces"
            hintText="Search for Places Here"
            hintStyle={styles.hintStyle}
        /><br />
        <RaisedButton
            label="Search"
            buttonStyle={styles.buttonStyle}
            onTouchTap={this.handleTouchTap}
        />
    </div>
);

export default SearchField;