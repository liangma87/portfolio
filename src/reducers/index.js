import { combineReducers } from 'redux'
import { 
  ADD_TODO,
  TOGGLE_TODO,
  REMOVE_TODOS,
  ADD_STOCK,
  REMOVE_STOCKS,
  SET_STOCK_FILTER
} from '../actions'

const todos = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
          ...state,
          {
            id: action.id,
            stock_id: action.stock_id,
            text: action.text,
            completion_date: action.completion_date,
            completed: false
          }
        ]
    case TOGGLE_TODO:
      return state.map((todo) => {
          if (todo.id === action.id) {
            var mydate = new Date(todo.completion_date)
            mydate.setDate(mydate.getDate() + 7 * action.weeks)
            return Object.assign({}, todo, {
              completion_date: mydate.toISOString().split('T')[0]
            })
            //mydate.toISOString().split('T')[0]
            //var mydate = new Date('2014-05-08')
            //mydate.setDate(mydate.getDate() + 7 * weeks)
          } else {
            return todo
          }
        })
    case REMOVE_TODOS:
      return []
    default:
      return state
  }
}

const stocks = (state = [], action) => {
  switch (action.type) {
    case ADD_STOCK:
      return [
          ...state,
          {
            id: action.id,
            ticker: action.ticker,
            name: action.name,
            todo_cnts: action.todo_cnts
          }
      ]
    case REMOVE_STOCKS:
      return []
    default:
      return state
  }
}

const filters = (state = [], action) => {
  switch (action.type) {
    case SET_STOCK_FILTER:
      return action.id
    default:
      return state
  }
}

export default combineReducers({
  todos,
  stocks,
  filters,
})
