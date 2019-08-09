import { connect } from 'react-redux'
import { addTodo,
  removeTodos,
  addStock,
  removeStocks,
  setStockFilter
} from '../actions'
import TodoFilter from '../components/todo/TodoFilter'

const mapStatetoProps = state => {
  return {
    stocks: state.stocks,
    todo_cnt: state.todos.length
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeTodos: () => {
      dispatch(removeTodos())
    },
    addTodo: (text, completion_date, todo_id, stock_id) => {
      dispatch(addTodo(text, completion_date, todo_id, stock_id))
    },
    addStock: (ticker, name, id, todos_cnt) => {
      dispatch(addStock(ticker, name, id, todos_cnt))
    },
    removeStocks: () => {
      dispatch(removeStocks())
    },
    setStockFilter: (stock_id) => {
      dispatch(setStockFilter(stock_id))
    }
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(TodoFilter)
