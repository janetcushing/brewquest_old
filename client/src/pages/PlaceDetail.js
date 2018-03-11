import React, { Component } from "react";
import Container from "../components/Container";
import Row from "../components/Row";
import Col from "../components/Col";
import PlaceDetailNotes from "../components/PlaceDetailNotes";
import API from "../utils/API";
import Clear from 'material-ui/svg-icons/content/clear';
import { Card, CardActions, CardTitle, CardText, CardMedia } from 'material-ui/Card';
import Check_box_outline_blank from 'material-ui/svg-icons/toggle/check-box-outline-blank'
import Check_box from 'material-ui/svg-icons/toggle/check-box'
import Place from 'material-ui/svg-icons/maps/place'
import PlaceDetailHours from "../components/PlaceDetailHours";
import PlaceDetailGeneralInformation from "../components/PlaceDetailGeneralInformation";
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

    // loadMap = id => {

    // }

    render() {
        return (
            <div id="saved-detail-page-background">
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
                                    <div id="card-action-div" className="main-container">
                                        <CardActions>
                                            {
                                                (this.state.been_there) ?
                                                    <Check_box onClick={() => this.unCheckBeenThere(this.state.detail._id)} /> : <Check_box_outline_blank onClick={() => this.checkBeenThere(this.state.detail._id)} />
                                            }
                                            )}

                                            <a href={this.state.detail.url} target="blank" >
                                            <Place />
                                            </a>
                                            <Clear onClick={() => this.deletePlace(this.state.detail._id)} />
                                        </CardActions>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col size="sm-12">
                                    {/* Lauren add GENERAL INFORMATION component under here */}
                                    <PlaceDetailGeneralInformation
                                    full_address={this.state.detail.full_address}
                                    num_reviews={this.state.detail.num_reviews}
                                    phone={this.state.detail.phone}
                                    website={this.state.detail.website}
                                    />

                                    {/* Lauren add HOURS component under here */}
                                    <PlaceDetailHours
                                    SundayHours={this.state.detail.weekday_text[6]}
                                    MondayHours={this.state.detail.weekday_text[0]}
                                    TuesdayHours={this.state.detail.weekday_text[1]}
                                    WednesdayHours={this.state.detail.weekday_text[2]}
                                    ThursdayHours={this.state.detail.weekday_text[3]}
                                    FridayHours={this.state.detail.weekday_text[4]}
                                    SaturdayHours={this.state.detail.weekday_text[5]}
                                    />


                                    {/* James add NOTES component under here */}
                                    <PlaceDetailNotes />


                                    {/* Add REVIEWS component under here */}

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