import React from "react";
import { Card, CardActions, CardTitle, CardText, CardHeader } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { login } from '../../utils/AuthService';
import { Link } from "react-router-dom";

const PlaceGeneralInformation = props =>
                <Card>
                    <CardHeader title="General Information" 
                    actAsExpander={true}
                    showExpandableButton={true}/>
                    <CardText expandable={true}>
                    {/* {props.brewery_name} */}
                    General Information Goes Here
                    </CardText>
                </Card>
                
export default PlaceGeneralInformation;
