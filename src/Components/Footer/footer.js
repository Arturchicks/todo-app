import React from "react"

import Filters from "../TasksFilter/tasks-filter"
import "./footer.css"
function Footer({ todo, todos, filter, changeFilter, clearCompleted }) {
  return (
    <footer className="footer">
      <span className="todo-count">{`${todo} items left`}</span>
      <div>
        <Filters todos={todos} filter={filter} changeFilter={changeFilter} />
      </div>
      <button type="button" className="clear-completed" onClick={() => clearCompleted()}>
        Clear completed
      </button>
    </footer>
  )
}
export default Footer
