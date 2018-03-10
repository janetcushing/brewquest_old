import React, { Component } from "react";
import Container from "../components/Container";
import Row from "../components/Row";
import Col from "../components/Col";
import API from "../utils/API";
import Clear from 'material-ui/svg-icons/content/clear';
import { Card, CardActions, CardTitle, CardText, CardMedia } from 'material-ui/Card';
import Check_box_outline_blank from 'material-ui/svg-icons/toggle/check-box-outline-blank'
import Check_box from 'material-ui/svg-icons/toggle/check-box'
// import Snackbar from 'material-ui/Snackbar';
// import RaisedButton from 'material-ui/RaisedButton';

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

    componentDidMount() {
        console.log(this.props.location.state)
        console.log("this is" + this.state.detail)
        console.log(this.state.been_there)
    }

    deletePlace = id => {
        API.deleteSavedPlace(id)
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
            <div id="saved-detail-page-background">
                <Container>
                    <Row>
                        <Col size="sm-12">
                            {/* <AppbarRow /> */}
                        </Col>
                    </Row>
                </Container>
                <div class="main-container">
                    <Container>
                        <Card key={this.state.detail._id}>
                            <Row>
                                <Col size="sm-8">
                                    <div id="card-title-div">
                                        <CardTitle title={this.state.detail.brewery_name} />
                                    </div>
                                </Col>
                                <Col size="sm-4">
                      <div id="card-action-div" class="main-container">
                                <CardActions>
                                    <Clear onClick={() => this.deletePlace(this.state.detail._id)} />
                                    {
                                        (this.state.been_there) ?
                                            <Check_box onClick={() => this.unCheckBeenThere(this.state.detail._id)} /> : <Check_box_outline_blank onClick={() => this.checkBeenThere(this.state.detail._id)} />
                                    }
                                    )}
                        </CardActions>
                        </div>
                        </Col>
                            </Row>
                        </Card>
                    </Container>
                </div>
            </div>
        );
    }
}

export default Detail;