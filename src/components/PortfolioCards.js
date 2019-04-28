import React, { Component } from 'react';
import { Button, Card, CardImg, CardText, CardColumns, CardBody, CardTitle } from 'reactstrap';
import video_logo from '../video-game.jpg'; 
import social_logo from '../social-media.jpg'; 
import energy_logo from '../energy.jpg';
import semiconductor_logo from '../semiconductor.jpg';
import food_logo from '../food.jpg';
import retail_logo from '../retail.jpg';


class PortfolioCards extends Component {
  render() {
    return (
      <CardColumns className="center-align">
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
        <Card>
          <CardImg top width="100%" src={retail_logo} alt="Card image cap" />
          <CardBody>
            <CardTitle>Retail Portfolio</CardTitle>
            <Button>Learn More</Button>
          </CardBody>
        </Card>
        <Card>
          <CardImg top width="100%" src={food_logo} alt="Card image cap" />
          <CardBody>
            <CardTitle>Food Portfolio</CardTitle>
            <Button>Learn More</Button>
          </CardBody>
        </Card>
        <Card>
          <CardImg top width="100%" src={semiconductor_logo} alt="Card image cap" />
          <CardBody>
            <CardTitle>Semiconductor Portfolio</CardTitle>
            <Button>Learn More</Button>
          </CardBody>
        </Card>
        {/*TODO HealthCare*/}
      </CardColumns>
    );
  }
}

export default PortfolioCards