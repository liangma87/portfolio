/*
 * action types
 */
export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOOGLE_TODO'
export const REMOVE_TODOS = 'REMOVE_TODOS'

export const ADD_STOCK = 'ADD_STOCK'
export const REMOVE_STOCKS = 'REMOVE_STOCKS'

export const ADD_STOCK_FILTER = 'ADD_STOCK_FILTER'
export const SET_STOCK_FILTER = 'SET_STOCK_FILTER'

/*
 * action creators
 */
export const addTodo = (text, completion_date, todo_id, stock_id) => ({
  type: ADD_TODO,
  id: todo_id,
  stock_id: stock_id,
  completion_date: completion_date,
  text
})

export const toggleTodo = (id, weeks) => ({
  type: TOGGLE_TODO,
  id: id,
  weeks: weeks
})

export const removeTodos = () => ({
  type: REMOVE_TODOS,
})

export const addStock = (ticker, name, id, todo_cnts) => ({
  type: ADD_STOCK,
  id: id,
  ticker: ticker,
  name: name,
  todo_cnts: todo_cnts
})

export const removeStocks = () => ({
  type: REMOVE_STOCKS,
})

export const setStockFilter = (stock_id, status) => ({
  type: SET_STOCK_FILTER,
  id: stock_id,
})
