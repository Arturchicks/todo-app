import React, { useState } from "react"

import Footer from "../Footer/footer"
import TaskForm from "../NewTaskForm/new-task-form"
import TaskList from "../TaskList/task-list"

function App() {
  const [todosData, setTodosData] = useState([])
  const [filter, setFilter] = useState("All")
  const [min, setMin] = useState(0)
  const [sec, setSec] = useState(0)
  const intervalIds = []
  const intervalArr = []
  let maxId = (Math.random() * 100).toFixed(0)
  const handleMin = (min) => {
    setMin(min)
  }
  const handleSec = (sec) => {
    setSec(sec)
  }
  const stopTimer = (id) => {
    setTodosData((prevTodosData) => {
      const item = prevTodosData.find((e) => e.id === id)
      clearInterval(item.interval)
      item.paused = true
      item.started = false
      return [...prevTodosData]
    })
  }
  const onToggleDone = (id) => {
    stopTimer(id)
    setTodosData((prevTodosData) => {
      const idx = prevTodosData.findIndex((el) => el.id === id)
      const oldItem = prevTodosData[idx]
      const newItem = { ...oldItem, done: !oldItem.done }
      return [...prevTodosData.slice(0, idx), newItem, ...prevTodosData.slice(idx + 1)]
    })
  }
  const changeCheck = (id) => {
    setTodosData((prevTodosData) => {
      const idx = prevTodosData.findIndex((el) => el.id === id)
      const oldItem = prevTodosData[idx]
      const newItem = { ...oldItem, isChecked: !oldItem.isChecked }
      return [...prevTodosData.slice(0, idx), newItem, ...prevTodosData.slice(idx + 1)]
    })
  }
  const changeFilter = (data) => {
    setFilter(data)
  }
  const filteredItems = () => {
    return todosData.filter(({ done }) => {
      switch (filter) {
        case "All":
          return true
        case "Active":
          return done === false
        case "Completed":
          return done === true
        default:
          return true
      }
    })
  }
  const clearCompleted = () => {
    const newArray = todosData.filter((e) => !e.done)
    setTodosData(newArray)
  }
  const deleteItem = (id) => {
    stopTimer(id)
    setTodosData((prevTodosData) => {
      const idx = prevTodosData.findIndex((el) => el.id === id)
      return prevTodosData.toSpliced(idx, 1)
    })
  }
  const startTimer = (id) => {
    const item = todosData.find((e) => e.id === id)
    const ids = intervalIds.find((e) => e.id === id)
    let arr = []
    arr.push(ids)
    if (!item.started && arr.length === 1) {
      const intervalId = setInterval(() => {
        item.time = item.time - 1000
        console.log(intervalIds)
      }, 1000)
      item.interval = intervalId
      if (!ids) {
        intervalIds.push({ id: id, interval: intervalId })
        intervalArr.push(intervalId)
      }
    }
    item.paused = false
    item.started = true
  }

  const todoCount = todosData.filter((el) => !el.done).length
  const addItem = (text) => {
    const newItem = {
      name: text,
      id: maxId++,
      done: false,
      isChecked: false,
      date: new Date(),
      time: min * 60 * 1000 + sec * 1000,
      paused: true,
      interval: 0,
      started: false
    }
    setTodosData((prevTodosData) => [newItem, ...prevTodosData])
    setMin(0)
    setSec(0)
  }
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <TaskForm onAdd={addItem} handleMin={handleMin} handleSec={handleSec} />
      </header>
      <section className="main">
        <TaskList
          todos={filteredItems()}
          onDelete={deleteItem}
          changeCheck={changeCheck}
          onToggleDone={onToggleDone}
          startTimer={startTimer}
          stopTimer={stopTimer}
        />
        <Footer
          todo={todoCount}
          todos={todosData}
          filter={filter}
          changeFilter={changeFilter}
          clearCompleted={clearCompleted}
        />
      </section>
    </section>
  )
}
export default App
