import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import ChartComponent from './components/ChartComponent';
import PortfolioCards from './components/PortfolioCards';
import { Col } from 'reactstrap';
import TodoApp from './components/todo/TodoApp'
import { Route, Switch } from 'react-router-dom';
import Signin from './components/auth/Signin'
import AddTodo from './components/AddTodo';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        activeTab: '1'
    };
  };

  /*this var is also set inside header*/
  toggleTab = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  } ;

  render() {
    
    return (
      <div className="App">
        <Header 
            toggleTab={this.toggleTab}
        />
        <div className='mr-3 ml-3'>
          <Switch>
            <Route exact path='/' component={PortfolioCards}/>
            <Route path="/portfolios" component={PortfolioCards} />
            <Route path="/todos" component={TodoApp} />
            <Route path="/login" component={Signin} />
            <Route path="/addtodo/:ticker" component={AddTodo} />
          </Switch>
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
