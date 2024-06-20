import React, { useState } from "react"
import "./new-task-form.css"
function TaskForm({ onAdd, handleMin, handleSec }) {
  const [min, setMin] = useState(0)
  const [sec, setSec] = useState(0)
  return (
    <form className="new-todo-form">
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.target.value.trim() !== "") {
            onAdd(e.target.value)
            e.target.value = ""
            setMin(0)
            setSec(0)
          }
        }}
      />
      <input
        className="new-todo-form__timer"
        placeholder="M"
        type="number"
        min={0}
        max={60}
        value={min}
        onChange={(e) => {
          setMin(+e.target.value, handleMin(e.target.value))
        }}
      />
      <input
        className="new-todo-form__timer"
        placeholder="S"
        type="number"
        min={0}
        max={60}
        value={sec}
        onChange={(e) => {
          setSec(+e.target.value, handleSec(e.target.value))
        }}
      />
    </form>
  )
}
export default TaskForm
