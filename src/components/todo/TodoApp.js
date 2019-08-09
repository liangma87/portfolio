import React from 'react'
import TodoListContainer from '../../containers/TodoListContainer'
import TodoFilterContainer from '../../containers/TodoFilterContainer'

const TodoApp = () => (
  <div>
    <TodoFilterContainer />
    <TodoListContainer />
  </div>
)

export default TodoApp