import React from "react";
import { Card, CardActions, CardTitle, CardText, CardHeader } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
// import { login } from '../../utils/AuthService';
// import { Link } from "react-router-dom";



const NotesCard = props =>


    <Card>

        <CardHeader
            actAsExpander={true}
            showExpandableButton={true}
            title="My Notes" />


        <CardText expandable={true}>

            <TextField
                hintText="Enter a Note Here"
                // floatingLabelText="Enter a Note Here"
                multiLine={true}
                fullWidth={true}
                rows={1}
                rowsMax={4}
            />

            <CardActions>

                <FlatButton
                    label="Add a Note" />


                {/* {
                                (!props.loggedIn) ?
                                    <FlatButton
                                        onClick={() => login()}
                                        label="Login to Save" />
                                    :
                                    (result.saved) ?
                                        <FlatButton
                                            // primary={true}
                                            // href={result.web_url}
                                            // target="_blank"
                                            onClick={(event) => props.handlePlacesDelete(event, result.details_key)}
                                            value={result.details_key}
                                            label="Delete from Saved" />
                                        :
                                        // (!result.saved) 
                                        <FlatButton
                                            onClick={(event) => props.handlePlacesSave(event, result.details_key)}
                                            value={result.details_key}
                                            label="Save to my list" />
                            } */}


            </CardActions>

            {/* Add Individual Note Components here */}

        </CardText>
    </Card>

export default NotesCard;
