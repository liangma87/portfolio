import React from 'react'
import VisibleTodoList from '../../containers/VisibleTodoList'
import TodoFilter from './TodoFilter'

const TodoApp = () => (
  <div>
    <TodoFilter />
    <VisibleTodoList />
  </div>
)

export default TodoApp