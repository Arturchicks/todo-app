import React, { Component } from "react"
import { format } from "date-fns"
import PropTypes from "prop-types"

import Timer from "../Timer/timer"

import "./task.css"

export default class Task extends Component {
  static mounted = 0
  constructor(props) {
    super(props)
    this.state = {
      edit: false,
      value: "",
      time: 0,
      started: false,
      toggled: false
    }
  }
  startTimer = () => {
    if (!this.state.started)
      this.intervalId = setInterval(() => {
        this.setState((prevState) => ({ time: prevState.time - 1000 }))
      }, 1000)
    this.setState({ started: true })
  }
  stopTimer = () => {
    this.setState({ started: false })
    clearInterval(this.intervalId)
  }
  componentDidMount = () => {
    const { paused } = this.props
    this.setState({ time: this.props.time })

    if (!paused) this.startTimer()
  }
  componentWillUnmount = () => {
    this.stopTimer()
  }
  render() {
    const {
      name,
      onDelete,
      changeCheck,
      isChecked,
      onToggleDone,
      done,
      date,
      time,
      started,
      startTimer,
      stopTimer,
      id
    } = this.props
    const { edit, value } = this.state
    const handleClick = () => {
      changeCheck()
      onToggleDone()
    }
    const handleStart = () => {
      if (!this.state.toggled) {
        startTimer(id)
        this.startTimer()
      }
    }
    const handleStop = () => {
      stopTimer(id)
      this.stopTimer()
    }

    const handleToggle = () => {
      changeCheck()
      this.stopTimer()
      this.setState({ toggled: !this.state.toggled })
    }
    let tag

    if (edit) {
      tag = (
        <input
          type="text"
          value={value}
          className="edit"
          onChange={(e) => this.setState({ value: e.target.value })}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              this.setState({
                edit: !edit
              })
            }
          }}
        />
      )
    }
    let val
    if (value === "") {
      val = name
    } else {
      val = value
    }
    if (!edit) {
      tag = (
        <li className={`${done ? "task completed" : "task"}`}>
          <div className="view">
            <div className="wrapper">
              <label className="label">
                <input
                  className="toggle"
                  type="checkbox"
                  checked={isChecked}
                  onChange={onToggleDone}
                  onClick={handleToggle}
                />
              </label>
              <span className="title" onClick={handleClick}>
                {val}
              </span>
            </div>
            <span className="description">
              <button
                type="button"
                className="icon icon-play"
                onClick={handleStart}
              />

              <button
                type="button"
                className="icon icon-pause"
                onClick={handleStop}
              />
            </span>
            <div className="timer-wrapper">
              <Timer date={date} />
            </div>

            <button
              type="button"
              className="icon icon-edit"
              onClick={() => this.setState({ edit: !edit, value: val })}
            />
            <button
              type="button"
              className="icon icon-destroy"
              onClick={onDelete}
            />
            <div className="task-timer-wrapper">
              {this.state.time === 0 && this.state.started
                ? handleStop()
                : format(new Date(this.state.time), "mm:ss")}
            </div>
          </div>
        </li>
      )
    }
    return tag
  }
}

Task.propTypes = {
  name: PropTypes.string.isRequired,
  done: PropTypes.bool,
  isChecked: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  changeCheck: PropTypes.func.isRequired
}

Task.defaultProps = {
  done: false,
  isChecked: false
}
