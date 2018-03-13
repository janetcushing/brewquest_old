import React from "react";
import { Card, CardActions, CardTitle, CardText, CardHeader } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Clear from 'material-ui/svg-icons/content/clear';
import Container from "../Container";
import Row from "../Row";
import Col from "../Col";
import SavedNotes from "../SavedNotes";
// import { login } from '../../utils/AuthService';
// import { Link } from "react-router-dom";



const PlaceDetailReviews = props =>


    <Card>

        <CardHeader
            actAsExpander={true}
            showExpandableButton={true}
            title="Reviews" />


        <CardText expandable={true}>

            <SelectField
                hintText="Rating"
                value={props.ratingInput}
                onChange={props.handleRatingInputChange}
            >
                <MenuItem value={1} primaryText="The Worst" />
                <MenuItem value={2} primaryText="Bad" />
                <MenuItem value={3} primaryText="Not Bad" />
                <MenuItem value={4} primaryText="Good" />
                <MenuItem value={5} primaryText="Very Good" />
            </SelectField>

            <TextField
                hintText="Add a New Review"
                multiLine={true}
                fullWidth={true}
                rows={1}
                rowsMax={4}
                value={props.reviewInput}
                onChange={props.handleReviewInputChange}
            />

            <CardActions>

                <FlatButton
                    // onClick={(event) => props.handleSaveNote(event)}
                    label="Add Review" />

            </CardActions>

            {/* {props.savedNotes.map(note =>


                <Card key={note._id}>

                    <CardText>

                        {note.body}
                        <br />
                        {note.date}

                    </CardText>

                    <CardActions>

                        <Clear onClick={() => props.handleDeleteNote(note._id)} />

                    </CardActions>

                </Card>

            )}
 */}
        </CardText>
    </Card>

export default PlaceDetailReviews;
