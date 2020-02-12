import { connect } from 'react-redux'
import { addTodo, toggleTodo} from '../actions'
import TodoList from '../components/todo/TodoList'

const getFilteredTodos = (filter, todos) => {
  if(filter == -1) {
    return todos;
  } else {
    return todos.filter(todo => todo.stock_id == filter);
  }
}

const mapStatetoProps = state => {
  return {
    // Assuming todos is in asending order by default
    todos: getFilteredTodos(state.filters, state.todos),
    stocks: state.stocks
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTodoDateClick: (id, weeks) => {
      dispatch(toggleTodo(id, weeks))
    },
    addTodo: (text, completion_date, todo_id, stock_id) => {
      dispatch(addTodo(text, completion_date, todo_id, stock_id))
    }
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(TodoList)
