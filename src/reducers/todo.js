import { combineReducers } from 'redux'
import { 
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  VisibilityFilters 
} from '../actions'

const { SHOW_ALL } = VisibilityFilters

const todos = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
          ...state,
          {
            id: action.id,
            text: action.text,
            completed: false
          }
        ]
    case TOGGLE_TODO:
      return state.map((todo) => {
          if (todo.id === action.id) {
            return Object.assign({}, todo, {
              completed: !todo.completed
            })
          } else {
            return todo
          }
        })
    default:
      return state
  }
}

const visibilityFilter = (state = SHOW_ALL, action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

export default combineReducers({
  visibilityFilter,
  todos
})
