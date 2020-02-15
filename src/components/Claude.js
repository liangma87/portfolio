import React from 'react'
import { ListGroup } from 'reactstrap';
import Todo from './todo/Todo'

// Claude represents TODO list
class Claude extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
  }

  componentDidMount() {

    fetch("http://0.0.0.0:3040/api/v1/todos")
    .then((res) => res.json())
    .then((res) => {
      this.setState({todos: res})
      console.log(this.state.todos);
    })
    .catch((err) => alert(err));
  }

  render() {
    const todos = this.state.todos
    
    if(todos.length <= 0) {
      return (<div>Loading...</div>)
    }

    var selected;
    selected = todos.filter(todo => 
      this.props.stocks.length > 1 | this.props.stocks[0].id === todo.company_id);

    console.log(selected)
    return (<ListGroup>
      {selected.map((todo) => {
        return (
          <Todo
          key = {todo.id}
          {...todo}
          stock = {this.props.stocks.find(stock => stock.id === todo.company_id)}
          />
        )
      })}
      </ListGroup>);
  }
}

export default Claude