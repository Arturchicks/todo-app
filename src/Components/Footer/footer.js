import React from "react"

import Filters from "../TasksFilter/tasks-filter"

function Footer(props) {
  const { todo, todos, filter, changeFilter, clearCompleted } = props
  return (
    <footer className="footer">
      <span className="todo-count">{`${todo} items left`}</span>
      <div>
        <Filters todos={todos} filter={filter} changeFilter={changeFilter} />
      </div>
      <button
        type="button"
        className="clear-completed"
        onClick={() => clearCompleted()}
      >
        Clear completed
      </button>
    </footer>
  )
}
export default Footer
