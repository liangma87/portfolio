/*
 * action types
 */
let nextTodoId = 0

export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOOGLE_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

/*
 * other constants
 */
export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

/*
 * action creators
 */
export const addTodo = text => ({
  type: ADD_TODO,
  id: nextTodoId++, 
  text
})

export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  id
})

export const setVisibilityFilter = filter => ({
  type: SET_VISIBILITY_FILTER,
  filter
})
