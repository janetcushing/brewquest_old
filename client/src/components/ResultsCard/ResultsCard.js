import React from "react";
import { Card, CardActions, CardTitle, CardText, CardHeader } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { login } from '../../utils/AuthService';
import { Link } from "react-router-dom";


const ResultsCard = props =>

    <Card>
        <CardTitle title="Results" />
        <CardText>

            {props.results.map(result =>

                <Card key={result.details_key}>

                    <CardHeader
                        avatar={result.icon}
                        actAsExpander={true}
                        showExpandableButton={true}
                        title={result.brewery_name}
                        subtitle={'Rating: ' + result.rating} />


                    <CardText expandable={true}>

                        {'Category: Brewery'}
                        <br />
                        {'Price: ' + result.price_level}
                        {' Total Reviews: ' + result.num_reviews}
                        {/* {' Address: ' + result.full_address} */}
                        {' Address: ' + result.vicinity }
                        {result.phone}
                        {result.website}
                        {result.details_key}
                        {/* {'Open Now?: ' + (result.open_now ? 'Yes' : 'No')} */}
                        <CardActions>
                            {
                                // (props.loggedIn && result.saved) 
                                ( result.saved)?
                                    <FlatButton
                                        // primary={true}
                                        // href={result.web_url}
                                        // target="_blank"
                                        onClick={(event) => props.handlePlacesDelete(event, result.details_key)}
                                        value={result.details_key}
                                        label="Delete from Saved" />
                                    :
                                    // (props.loggedIn && !result.saved)
                                    // (!result.saved) ?
                                        <FlatButton
                                            onClick={(event) => props.handlePlacesSave(event, result.details_key)}
                                            value={result.details_key}
                                            label="Save to My List" />
                                        // :
                                        // (!props.loggedIn && result.saved) ?
                                            // <FlatButton
                                            //     onClick={() => login()}
                                            //     value={result.details_key}
                                            //     label="Delete from Saved" />
                                            // :
                                            // <FlatButton
                                            //     onClick={() => login()}
                                            //     label="Save to My List" />

                            }

                            <FlatButton
                                // secondary={true}
                                // onClick={() => props.handleArticleSave({
                                //     title: result.headline.main,
                                //     snippet: result.snippet,
                                //     date: result.pub_date,
                                //     url: result.web_url
                                // })}
                                label="More Info" />

                        </CardActions>
                    </CardText>
                </Card>
            )}
        </ CardText>

    </Card>;

export default ResultsCard;
