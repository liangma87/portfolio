import React from 'react'
import PropTypes from 'prop-types'
import TodoSetting from './TodoSetting.js'
import axios from 'axios';
import { addTodo } from '../../actions'
import { connect } from 'react-redux'
import { 
  Badge,
  Button,
} from 'reactstrap';
import AuthService from '../auth/AuthService';


class TodoFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: [],
    };
    this.auth = new AuthService();
  }

  componentDidMount() {
    this.auth.fetch("http://0.0.0.0:3040/api/v1/companies")
    .then((res) => res.json())
    .then((data) => {
      this.setState({stocks: data})
    })
    .catch((err) => alert(err));

    this.auth.fetch("http://0.0.0.0:3040/api/v1/companies/2/todos")
    .then((res) => res.json())
    .then((data) => {
      data.map( todo => {
        this.props.dispatch(addTodo(todo.notes))
      })
    })
    .catch((err) => alert(err));
  }

  render() {
    const { stocks } = this.state;
    if (stocks === null) return null;
    /*var data = stocks.map(stock => {
      return stock.symbol
    });*/

    var data = stocks.map(stock => {
      return (<Button color="secondary" outline className='mr-1 mb-1'>
        {stock.symbol} <Badge color="secondary">3</Badge>
      </Button>);
    });

    return (
      <div className="d-flex justify-content-between mb-3">
        <div>
          {data}
        </div>
        <TodoSetting />
      </div>
    );
  }
}

export default connect()(TodoFilter)