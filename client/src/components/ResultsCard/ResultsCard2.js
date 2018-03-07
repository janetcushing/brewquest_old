import React from "react";
import { Card, CardActions, CardTitle, CardText, CardHeader } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
// import Search from "../../pages/Search";
import { isLoggedIn } from '../../utils/AuthService';
import { Link } from "react-router-dom";

// handleBrewerySave = (event, details_key) => {
//     event.preventDefault();
//     console.log(`im in handleBrewerySave`);
//     console.log("value", details_key);
//     // console.log("key", this.result.details_key);
//     let detailsToSave = {
//         brewery_id: this.state.result[details_key].brewery_id,
//         brewery_name: this.state.result[details_key].brewery_name,
//         full_address: this.state.result[details_key].full_address,
//         icon: this.state.result[details_key].icon,
//         latitude: this.state.result[details_key].lat,
//         longitude: this.state.result[details_key].lng,
//         num_reviews: this.state.result[details_key].num_reviews,
//         phone: this.state.result[details_key].phone,
//         place_id: this.state.result[details_key].place_id,
//         price_level: this.state.result[details_key].price_level,
//         rating: this.state.result[details_key].rating,
//         website: this.state.result[details_key].website
//     }
//     console.log(detailsToSave);
//     API.saveBrewery(detailsToSave);
//     console.log("savedResult");
//     // this.loadSavedArticles();
// };

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
                        {' Address: ' + result.full_address}
                        {/* {' Address: ' + result.vicinity } */}
                        {result.phone}
                        {result.website}
                        {result.details_key}
                        {/* {'Open Now?: ' + (result.open_now ? 'Yes' : 'No')} */}
                        <CardActions>
                            {/* <FlatButton
                                // primary={true}
                                // href={result.web_url}
                                // target="_blank"
                                onClick={(event) => props.handleBrewerySave(event, result.details_key)}
                                value={result.details_key}
                                label="Save to My List" /> */}

                            {
                                (isLoggedIn()) ?
                                    <FlatButton
                                        onClick={(event) => props.handleBrewerySave(event, result.details_key)}
                                        value={result.details_key}
                                        label="Save to My List" />
                                    :
                                    // <FlatButton
                                    //     onClick="default"
                                    //     value={result.details_key} 
                                    // label="Saved"   
                                    // /> 
                                    <Link to="/login" ></Link>
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

