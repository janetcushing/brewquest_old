import React from "react";
import Container from "../Container";
import Row from "../Row";
import Col from "../Col";
import { Card, CardActions, CardTitle, CardText, CardHeader } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Clear from 'material-ui/svg-icons/content/clear';
import { login } from '../../utils/AuthService';


const SavedNotes = props => {

    <Card >
    {/* <Card key={result.details_key}> */ }


        <CardText>

            {/* INSERT NOTE HERE */}
            {"Note Text Goes Here"}

        </CardText>

        <CardActions>

            {/* <Clear onClick={() => this.deletePlace(result._id)} /> */}
            <Clear />

        </CardActions>

    </Card>

}

export default SavedNotes;
