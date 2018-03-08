import React from 'react';
import { Link } from "react-router-dom";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { blue50, grey50, grey900 } from 'material-ui/styles/colors';

const styles = {
    hintStyle: {
        color: blue50,
    },
    buttonStyle: {
        backgroundColor: grey50,
        labelColor: grey900,
    }
};


const SearchField = props => (
    <div>
        <TextField
            name="SearchforPlaces"
            hintText="Search for Places Here"
            hintStyle={styles.hintStyle}
            // value={props.searchLocation}
            onChange={props.handleSearchLocationChange}
        />
        <Link to={{
            pathname: '/search',
            state: { searchLocation: props.searchLocation }
        }}>
            <RaisedButton
                label="Search"
                buttonStyle={styles.buttonStyle}
                onTouchTap={this.handleTouchTap}
                onClick={(event) => props.handleFormSubmit(event)}
            />
        </Link>
    </div>
);

export default SearchField;