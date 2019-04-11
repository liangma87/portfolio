import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import ChartComponent from './components/ChartComponent'
import { Row, Col, Jumbotron, Button } from 'reactstrap';
import { Card, CardImg, CardText, CardColumns, CardImgOverlay, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import video_logo from './video-game.jpg'; 
import social_logo from './social-media.jpg'; 
import energy_logo from './energy.jpg'; 


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Row>
          <Col sm={{ size: 10, offset: 1 }}>
            <ChartComponent />
          </Col>
        </Row>
      <Col sm={{ size: 10, offset: 1 }}>
        <CardColumns>
          <Card>
            <CardImg top width="100%" src={social_logo} alt="Card image cap" />
            <CardBody>
              <CardTitle>Social Media Portfolio</CardTitle>
              <Button>Learn More</Button>
            </CardBody>
          </Card>
          <Card>
            <CardImg top width="100%" src={video_logo} alt="Card image cap" />
            <CardBody>
              <CardTitle>Video Games Portfolio</CardTitle>
              <Button>Learn More</Button>
            </CardBody>
          </Card>
          <Card>
            <CardImg top width="100%" src={energy_logo} alt="Card image cap" />
            <CardBody>
              <CardTitle>Energy Portfolio</CardTitle>
              <Button>Learn More</Button>
            </CardBody>
          </Card>
          </CardColumns>
        </Col>
      </div>
    );
  }
}

export default App;
