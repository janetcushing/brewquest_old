import React from "react";
import { Card, CardActions, CardTitle, CardText, CardHeader } from 'material-ui/Card';
// import FlatButton from 'material-ui/FlatButton';
// import { login } from '../../utils/AuthService';
// import { Link } from "react-router-dom";



const Notes = props =>


    <Card>
        <CardTitle title="My Notes" />
        <CardText>

                <Card key={result.details_key}>

                    <CardHeader
                        avatar={result.icon}
                        actAsExpander={true}
                        showExpandableButton={true}
                        title={result.brewery_name}
                        subtitle={'Rating: ' + result.rating} />


                    <CardText expandable={true}>

                        {'Insert Note Input field here'}
                        <br />

                        {'Insert Saved Notes Here'}
                        <br />

                        <CardActions>
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

                            <FlatButton
                                // secondary={true}
                                // onClick={() => props.handleArticleSave({
                                //     title: result.headline.main,
                                //     snippet: result.snippet,
                                //     date: result.pub_date,
                                //     url: result.web_url
                                // })}
                                label="Add a Note" />

                        </CardActions>
                    </CardText>
                </Card>
            )}
        </ CardText>

    </Card>;

export default Notes;
