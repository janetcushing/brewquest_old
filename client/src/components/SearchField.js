import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const SearchField = () => (
    <div>
        <TextField
            hintText="Search for Places Here"
        /><br />
        <RaisedButton
            label="Search"
            secondary={true}
            onTouchTap={this.handleTouchTap}
        />
    </div>
);

export default SearchField;