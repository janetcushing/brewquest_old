import React from "react";
import { Card, CardActions, CardTitle, CardText, CardHeader } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { login } from '../../utils/AuthService';
import { Link } from "react-router-dom";

const PlaceDetailHours = props =>
                <Card>
                    <CardHeader title="Hours" 
                    actAsExpander={true}
                    showExpandableButton={true}/>
                    <CardText expandable={true}>
                        {/* Need hours from JSON object to put in here */}
                    Hours go here
                    </CardText>
                </Card>
                
export default PlaceDetailHours;
