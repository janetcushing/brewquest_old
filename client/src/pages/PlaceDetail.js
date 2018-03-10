import React, { Component } from "react";
// import { Link } from "react-router-dom";
import Container from "../components/Container";
import Row from "../components/Row";
import Col from "../components/Col";
import API from "../utils/API";
import Clear from 'material-ui/svg-icons/content/clear';
import { Card, CardActions, CardTitle, CardText, CardMedia } from 'material-ui/Card';
// import Check from 'material-ui/svg-icons/navigation/check';
import Check_box_outline_blank from 'material-ui/svg-icons/toggle/check-box-outline-blank'
import Check_box from 'material-ui/svg-icons/toggle/check-box'
// import Info_outline from 'material-ui/svg-icons/action/info-outline'

class Detail extends Component {
    state = {
        results: [],
        detail: [],
        been_there: null
    };

    componentWillMount() {
        if (this.props.location.state) {
            this.setState({ detail: this.props.location.state.placedetail })
            this.setState({ been_there: this.props.location.state.placedetail.been_there })
                ;
        }
    }

    // When this component mounts, grab the book with the _id of this.props.match.params.id
    // e.g. localhost:3000/books/599dcb67f0f16317844583fc
    componentDidMount() {
        console.log(this.props.location.state)
        console.log("this is" + this.state.detail)
        // this.loadSavedPlace();
        console.log(this.state.been_there)
    }

    // loadSavedPlace = () => {
    //     API.getSavedPlace()
    //       .then(res =>
    //         this.setState({ detail: this.props.location.state.placedetail }),
    //         console.log("saved places", this.state.detail)
    //       )
    //       .catch(err => console.log(err));
    //   };

    // updateBeenThere = () => {
    //     this.setState({ been_there: })
    // }

    deletePlace = id => {
        API.deleteSavedPlace(id)
            // .then(res => this.loadSavedPlaces())
            // .catch(err => console.log(err));
            .then(res => window.location.href = '/savedplaces')
            .catch(console.log('oops, there it is!'))
    };

    checkBeenThere = id => {
        console.log(id)
        console.log("in checkbeenthere on saved places page")
        API.beenToPlace(id)
            .then(res => this.setState({ been_there: true }))
            .catch(err => console.log(err));
        console.log("this is this.state.been_there: " + this.state.been_there)
    };

    unCheckBeenThere = id => {
        console.log("in uncheckbeenthere on saved places page")
        API.haveNotBeenToPlace(id)
            .then(res => this.setState({ been_there: false }))
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col size="sm-12">
                            {/* <AppbarRow /> */}
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Card key={this.state.detail._id}>
                        <a href={this.state.detail.website}><CardTitle title={this.state.detail.brewery_name} /></a>
                        <CardTitle subtitle={this.state.detail.full_address} />
                        <CardMedia>
                            <img src={ this.state.detail.photos[0].html_attributions } alt="" />
                        </CardMedia>
                        <CardActions>
                            <Clear onClick={() => this.deletePlace(this.state.detail._id)} />
                            {
                                (this.state.been_there) ?
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
            </div>
        );
    }
}

export default Detail;