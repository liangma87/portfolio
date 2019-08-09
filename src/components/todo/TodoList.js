import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'
import { ListGroup } from 'reactstrap';


const TodoList = ({todos, stocks, onTodoDateClick}) => {

  return (<ListGroup>
    {todos.map((todo) => {
      return (
        <Todo
        key={todo.id}
        {...todo}
        stock = {stocks.find(stock => stock.id == todo.stock_id)}
        onDateClick={onTodoDateClick}
        />
      )
    })}
  </ListGroup>)
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  toggleTodo: PropTypes.func.isRequired
}

export default TodoList