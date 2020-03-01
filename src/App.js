import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
//import ChartComponent from './components/ChartComponent';
import Byleth from './components/Byleth';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        navItem: "Todos"
    };
  };

  onNavItemsChange = (item) => {
    this.setState({navItem: item});
  }
  render() {
    
    return (
      <div className="App">
        <Header 
          onNavItemsClick={this.onNavItemsChange}
          navItem={this.state.navItem}
        />
        <div className='mr-3 ml-3'>
          <Byleth
            navItem={this.state.navItem}
          />
        </div>
        {/*<Col sm={{ size: 10, offset: 1 }}>
          <ChartComponent
          symbol = "MSFT"
          />
        </Col>*/}
      </div>
    );
  }
}

export default App;
