import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import ChartComponent from './components/ChartComponent';
import PortfolioCards from './components/PortfolioCards';
import { Col } from 'reactstrap';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Col sm={{ size: 10, offset: 1 }}>
          <ChartComponent />
        </Col>
        <Col sm={{ size: 10, offset: 1 }}>
          <PortfolioCards />
        </Col>
      </div>
    );
  }
}

export default App;
