import React from "react";
import { Card, CardActions, CardTitle, CardText, CardHeader } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { login } from '../../utils/AuthService';
// import { Link } from "react-router-dom";

const ResultsCard = props =>
    <Card>
        <CardTitle title="Results"
            className="raleway-text" />
        <CardText>
            {/* {"props.loggedIn: " + props.loggedIn} */}
            {props.results.map(result =>

                <Card key={result.details_key}>

                    <CardHeader
                        // avatar={result.icon}
                        actAsExpander={true}
                        showExpandableButton={true}
                        title={result.brewery_name}
                        subtitle={'Rating: ' + result.rating}
                        className="raleway-text"
                    />
                    <CardText expandable={true}
                        className="raleway-text">
                        <CardActions>
                            {
                                (!props.loggedIn) ?
                                    <RaisedButton
                                        onClick={() => login()}
                                        label="Login to Save"
                                        className="save-button" />

                                    :
                                    (result.saved) ?
                                        <RaisedButton
                                            // primary={true}
                                            // href={result.web_url}
                                            // target="_blank"
                                            onClick={(event) => props.handlePlacesDelete(event, result.details_key)}
                                            value={result.details_key}
                                            label="Delete from Saved"
                                            className="save-button" />
                                        :
                                        // (!result.saved) 
                                        <RaisedButton
                                            onClick={(event) => props.handlePlacesSave(event, result.details_key)}
                                            value={result.details_key}
                                            label="Save to my list"
                                            className="save-button" />
                            }
                        </CardActions>
                        {/* {'Category: Brewery'} */}
                        <br />
                        <h3>Total Reviews</h3>
                        {result.num_reviews} reviews
                        <br />
                        <h3>Open Now?</h3>
                        {(result.open_now) ? 'Open Now' : 'Not Open Now'}
                        <br />
                        <h3>Address</h3>
                        {result.vicinity}
                        <br />
                        <h3>Phone</h3>
                        {result.phone}
                        <br />
                        <h3>Website</h3>
                        <a href={result.website} target="_new_tab">{result.website}</a>
                        <br />
                        {result.saved}

                        <CardActions>
                            {/* <FlatButton
                                // secondary={true}
                                // onClick={() => props.handleArticleSave({
                                //     title: result.headline.main,
                                //     snippet: result.snippet,
                                //     date: result.pub_date,
                                //     url: result.web_url
                                // })}
                                label="More Info" /> */}
                        </CardActions>
                    </CardText>
                </Card>
            )}
        </ CardText>
    </Card>;

export default ResultsCard;