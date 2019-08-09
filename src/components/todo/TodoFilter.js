import React from 'react'
import PropTypes from 'prop-types'
import { 
  Badge,
  Button,
} from 'reactstrap';
import AuthService from '../auth/AuthService';

class TodoFilter extends React.Component {
  constructor(props) {
    super(props);
    this.auth = new AuthService();
    this.state = { selected: -1, totoal_todos: 0};
  }

  onStockFilterClick = (stock_id) => {
    this.props.setStockFilter(stock_id)
    this.setState({ selected: stock_id, totoal_todos: this.state.totoal_todos})
  }

  // Can I just give the raw data to it?
  // Can reducers add a list of data in one-go?
  componentDidMount() {
    
    // Hack Hack
    if(this.props.stocks.length > 0) {
      this.setState({selected: -1, totoal_todos: this.props.todo_cnt})
      return
    }
    // Hack Hack

    this.auth.fetch("http://0.0.0.0:3040/api/v1/companies")
    .then((res) => res.json())
    .then((data) => {
      //this.props.removeStocks()
      var totoal_todos = 0;
      data.map( company => { 
        this.props.addStock(company.symbol, company.name, company.id, company.todos)
        totoal_todos += company.todos
      })
      // hack to provide a default, need to look into how to provide default
      this.props.setStockFilter(-1); 
      this.setState({ selected: this.state.selected, totoal_todos: totoal_todos})
    })
    .catch((err) => alert(err));

    //this.props.removeTodos()
    // A better way will be just fetching new ones
    this.auth.fetch("http://0.0.0.0:3040/api/v1/todos")
    .then((res) => res.json())
    .then((data) => {
      data.map( todo => { 
        this.props.addTodo(todo.notes, todo.completion_date, todo.id, todo.company_id)
      })
    })
    .catch((err) => alert(err));
  }

  render() {
    const stocks = this.props.stocks

    if(stocks.length <= 0) {
      return null
    }

    var data = stocks.map(stock => {
      return (
        <Button 
          color ="info"
          outline
          className='mr-1 mb-1'
          onClick={() => this.onStockFilterClick(stock.id)}
          active={this.state.selected == stock.id}
        >
          {stock.ticker} <Badge color="secondary">{stock.todo_cnts}</Badge>
        </Button>);
    });

    return (
      <div className="d-flex justify-content-between mb-3">
        <div>
          {data}
          <Button 
            color ="info"
            outline
            className='mr-1 mb-1'
            onClick={() => this.onStockFilterClick(-1)}
            active={this.state.selected == -1}
          >
            All <Badge color="secondary">{this.state.totoal_todos}</Badge>
          </Button>
        </div>
      </div>
    );
  }
}
export default TodoFilter