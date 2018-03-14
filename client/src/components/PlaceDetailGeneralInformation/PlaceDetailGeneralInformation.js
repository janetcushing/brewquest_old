import React from "react";
import { Card, CardActions, CardTitle, CardText, CardHeader } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { login } from '../../utils/AuthService';
import { Link } from "react-router-dom";

const PlaceGeneralInformation = props =>
                <Card>
                    <CardHeader title="General Information" 
                    actAsExpander={true}
                    showExpandableButton={true}
                    className="raleway-text"/>
                    <CardText expandable={true}
                    className="raleway-text">
                    <ul>
                        <p>
                    Address: {props.full_address}
                    </p>
                    <p>
                    Total Reviews: {props.num_reviews}
                    </p>
                    <p>
                    Phone: {props.phone}
                    </p>
                    <p>
                    Website: {props.website}
                    </p>
                    </ul>
                    </CardText>
                </Card>
                
export default PlaceGeneralInformation;
