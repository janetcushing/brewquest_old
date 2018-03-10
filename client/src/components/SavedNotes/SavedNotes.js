import React from "react";
import { Card, CardActions, CardTitle, CardText, CardHeader } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Clear from 'material-ui/svg-icons/content/clear';
import { login } from '../../utils/AuthService';


const SavedNotes = props => {
    props.results.map(result =>

        <Card key={result.details_key}>

            <CardText>

                {/* INSERT NOTE HERE */}
                <CardActions>

                    <Clear onClick={() => this.deletePlace(result._id)} />
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
    )
}

export default SavedNotes;
