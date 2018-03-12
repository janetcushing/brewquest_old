import React from "react";
import { Card, CardActions, CardTitle, CardText, CardHeader } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Clear from 'material-ui/svg-icons/content/clear';
import Container from "../Container";
import Row from "../Row";
import Col from "../Col";
import SavedNotes from "../SavedNotes";
// import { login } from '../../utils/AuthService';
// import { Link } from "react-router-dom";



const PlaceDetailNotes = props =>


    <Card>

        <CardHeader
            actAsExpander={true}
            showExpandableButton={true}
            title="My Notes" />


        <CardText expandable={true}>

            <TextField
                hintText="Enter a Note Here"
                multiLine={true}
                fullWidth={true}
                rows={1}
                rowsMax={4}
                value={props.noteInput}
                onChange={props.handleNoteInputChange}
            />

            <CardActions>

                <FlatButton
                    onClick={(event) => props.handleSaveNote(event)}
                    label="Add a Note" />

            </CardActions>

            {props.savedNotes.map(note =>


                <Card key={note._id}>

                    <CardText>

                        {note.body}
                        <br/>
                        {note.date}

                    </CardText>

                    <CardActions>

                        <Clear />

                    </CardActions>

                </Card>

            )}

        </CardText>
    </Card>

export default PlaceDetailNotes;
