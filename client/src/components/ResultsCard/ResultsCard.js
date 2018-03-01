import React from "react";
import { Card, CardActions, CardTitle, CardText, CardHeader } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
// import Search from "../../pages/Search";


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
                        title={result.name}
                        subtitle={'Rating: ' + result.rating} />
                        

                    <CardText expandable={true}>

                        {'Category: Brewery'}
                        <br/>
                        {/* {'Price: ' + result.price} */}
                        {' Total Reviews: ' + result.num_reviews }
                        {' Address: ' + result.full_address }
                        {/* {' Address: ' + result.vicinity } */}
                        { result.phone }
                        { result.website }
                        {/* {'Open Now?: ' + (result.open_now ? 'Yes' : 'No')} */}
                        <CardActions>
                            <FlatButton
                                // primary={true}
                                // href={result.web_url}
                                // target="_blank"
                                onClick={(event) => props.handleBrewerySave(event)}
                                value={result.details_key}
                                label="Save to My List" />
                                 

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

