import React, { Component } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import API from "../utils/API";
import Clear from 'material-ui/svg-icons/content/clear';
import { Card, CardActions, CardTitle, CardText, CardHeader } from 'material-ui/Card';
import Check from 'material-ui/svg-icons/navigation/check';
import Check_box_outline_blank from 'material-ui/svg-icons/toggle/check-box-outline-blank'
import Check_box from 'material-ui/svg-icons/toggle/check-box'
import Info_outline from 'material-ui/svg-icons/action/info-outline'

class Detail extends Component {
    state = {
        results: [],
        detail: []
    };

    componentWillMount() {
        if (this.props.location.state) {
            this.setState({ detail: this.props.location.state.placedetail }
            );
        }
    }

    // When this component mounts, grab the book with the _id of this.props.match.params.id
    // e.g. localhost:3000/books/599dcb67f0f16317844583fc
    componentDidMount() {
        console.log(this.props.location.state)
        console.log("this is" + this.state.detail)
    }

    deletePlace = id => {
        API.deleteSavedPlace(id)
            .then(res => this.loadSavedPlaces())
            .catch(err => console.log(err));
    };

    checkBeenThere = id => {
        console.log("in checkbeenthere on saved places page")
        API.beenToPlace(id)
            .then(res => this.getSavedPlace())
            .catch(err => console.log(err));
    };

    unCheckBeenThere = id => {
        console.log("in uncheckbeenthere on saved places page")
        API.haveNotBeenToPlace(id)
            .then(res => this.getSavedPlace())
            .catch(err => console.log(err));
    };

    render() {
        return (
            <Container fluid>
                <Card key={this.state.detail._id}>
                    <a href={this.state.detail.website}><CardTitle title={this.state.detail.brewery_name}  /></a>
                    <CardTitle subtitle={this.state.detail.full_address} />
                    <CardActions>
                        <Clear onClick={() => this.deletePlace(this.state.detail._id)} />
                        {
                            (this.state.detail.been_there) ?
                                <Check_box onClick={() => this.unCheckBeenThere(this.state.detail._id)} /> : <Check_box_outline_blank onClick={() => this.checkBeenThere(this.state.detail._id)} />
                        }
                        )}
                        </CardActions>
                    <CardText>
                        Phone: {this.state.detail.phone}
                    </CardText>
                    <CardText>
                        Price Level: {this.state.detail.price_level}
                    </CardText>
                </Card>
            </Container>
        );
    }
}

export default Detail;