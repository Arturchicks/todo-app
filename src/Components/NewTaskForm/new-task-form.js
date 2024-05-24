import React from "react"

function TaskForm({ onAdd }) {
  return (
    <input
      className="new-todo"
      placeholder="What needs to be done?"
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus
      onKeyDown={(e) => {
        if (e.key === "Enter" && e.target.value.trim() !== "") {
          onAdd(e.target.value)
          e.target.value = ""
        }
      }}
    />
  )
}
export default TaskForm
