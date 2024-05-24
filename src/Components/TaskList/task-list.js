import React from "react"
import PropTypes from "prop-types"

import Task from "../Task/task"

function TaskList({ todos, onDelete, onToggleDone, changeCheck }) {
  const elements = todos.map((item) => {
    const { id } = item
    return (
      <Task
        name={item.name}
        key={item.id}
        done={item.done}
        date={item.date}
        isChecked={item.isChecked}
        onDelete={() => onDelete(id)}
        onToggleDone={() => {
          onToggleDone(id)
        }}
        changeCheck={() => {
          changeCheck(id)
        }}
        length={todos.length}
      />
    )
  })
  return <ul className="todo-list">{elements}</ul>
}

TaskList.propTypes = {
  changeCheck: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default TaskList
