import React, { Component } from "react"
import "./new-task-form.css"

export default class TaskForm extends Component {
  constructor() {
    super()
    this.state = {
      min: 0,
      sec: 0,
      timeGone: false
    }
  }
  componentDidUpdate = () => {
    if (isNaN(this.state.min)) {
      this.setState({ min: 0 })
    }
    if (isNaN(this.state.sec)) {
      this.setState({ sec: 0 })
    }
  }

  render() {
    const { onAdd, handleMin, handleSec } = this.props
    const { min, sec } = this.state

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
              this.setState({ min: "", sec: "" })
            }
          }}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          value={min}
          maxLength={2}
          onChange={(e) =>
            this.setState({ min: +e.target.value }, () =>
              handleMin(e.target.value)
            )
          }
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          value={sec}
          maxLength={2}
          onChange={(e) => {
            this.setState({ sec: +e.target.value }, () =>
              handleSec(e.target.value)
            )
          }}
        />
      </form>
    )
  }
}
