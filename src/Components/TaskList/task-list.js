import React from "react"
import PropTypes from "prop-types"

import Task from "../Task/task"
import "./task-list.css"

function TaskList({
  todos,
  onDelete,
  onToggleDone,
  changeCheck,
  min,
  sec,
  startTimer,
  stopTimer,
  interval,
  handleStarted
}) {
  const elements = todos.map((item) => {
    const { id } = item

    return (
      <Task
        name={item.name}
        key={item.id}
        id={item.id}
        min={min}
        sec={sec}
        done={item.done}
        date={item.date}
        time={item.time}
        paused={item.paused}
        interval={interval}
        isChecked={item.isChecked}
        startTimer={startTimer}
        stopTimer={stopTimer}
        handleStarted={handleStarted}
        started={item.started}
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
