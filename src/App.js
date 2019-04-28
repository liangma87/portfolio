import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import ChartComponent from './components/ChartComponent';
import PortfolioCards from './components/PortfolioCards';
import Todos from './components/Todos';
import { Col } from 'reactstrap';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        activeTab: '1'
    };
  }

  /*this var is also set inside header*/
  toggleTab = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    const { activeTab } = this.state;
    let content;
    if (activeTab === '1') {
      content = <PortfolioCards />;
    } else if (activeTab === '3') {
      content = <Todos />;
    } else {
      content = null;
    }
    return (
      <div className="App">
        <Header 
            toggleTab={this.toggleTab}
        />
        {/*<Col sm={{ size: 10, offset: 1 }}>
          <ChartComponent
          symbol = "MSFT"
          />
        </Col>*/}
        <Col sm={{ size: 10, offset: 1 }}>
          {content}
        </Col>
      </div>
    );
  }
}

export default App;
