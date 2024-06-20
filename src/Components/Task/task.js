import React, { useEffect, useState, useRef } from "react"
import { format } from "date-fns"
import PropTypes from "prop-types"

import Timer from "../Timer/timer"
import "./task.css"
function Task({
  paused,
  time,
  name,
  onDelete,
  changeCheck,
  isChecked,
  onToggleDone,
  done,
  date,
  startTimer,
  stopTimer,
  id
}) {
  const [edit, setEdit] = useState(false)
  const [value, setValue] = useState("")
  const [currentTime, setCurrentTime] = useState(0)
  const [started, setStarted] = useState(false)
  const intervalId = useRef(null)
  useEffect(() => {
    setCurrentTime(time)
    if (!paused) timerUp()
    return () => timerDown()
  }, [])
  const timerUp = () => {
    if (!done && !started) {
      intervalId.current = setInterval(() => {
        setCurrentTime((prevState) => prevState - 1000)
      }, 1000)
    }
    setStarted(true)
  }
  const timerDown = () => {
    setStarted(false)
    console.log(intervalId)
    clearInterval(intervalId.current)
  }

  const handleClick = () => {
    changeCheck()
    onToggleDone()
  }
  const handleStart = () => {
    if (!done) {
      startTimer(id)
      timerUp()
      console.log("works")
    }
  }
  const handleStop = () => {
    stopTimer(id)
    timerDown()
  }
  const handleToggle = () => {
    changeCheck()
    timerDown()
  }
  const handleEdit = () => {
    setEdit((prevState) => !prevState)
    setValue(val)
  }
  let tag
  if (edit) {
    tag = (
      <input
        type="text"
        value={value}
        className="edit"
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setEdit((prevState) => !prevState)
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
            <button type="button" className="icon icon-play" onClick={handleStart} />
            <button type="button" className="icon icon-pause" onClick={handleStop} />
          </span>
          <div className="timer-wrapper">
            <Timer date={date} />
          </div>
          <button type="button" className="icon icon-edit" onClick={() => handleEdit()} />
          <button type="button" className="icon icon-destroy" onClick={onDelete} />
          <div className="task-timer-wrapper">
            {currentTime === 0 && started ? handleStop() : format(new Date(currentTime), "mm:ss")}
          </div>
        </div>
      </li>
    )
  }
  return tag
}
export default Task

Task.propTypes = {
  name: PropTypes.string.isRequired,
  done: PropTypes.bool,
  started: PropTypes.bool,
  isChecked: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  changeCheck: PropTypes.func.isRequired
}
Task.defaultProps = {
  done: false,
  isChecked: false,
  started: false
}
