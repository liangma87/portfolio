import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import ChartComponent from './components/ChartComponent'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <ChartComponent />
      </div>
    );
  }
}

export default App;
