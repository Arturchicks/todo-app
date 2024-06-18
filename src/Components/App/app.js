import React, { Component } from "react"

import Footer from "../Footer/footer"
import TaskForm from "../NewTaskForm/new-task-form"
import TaskList from "../TaskList/task-list"

export default class App extends Component {
  constructor() {
    super()
    this.maxId = 100
    this.intervalIds = []
    this.intervalArr = []
    this.state = {
      todosData: [],
      filter: "All",
      started: false,
      min: 0,
      sec: 0
    }
  }

  handleMin = (min) => {
    this.setState({ min: min })
  }
  handleSec = (sec) => {
    this.setState({ sec: sec })
  }
  handleUpdate = () => {
    this.uniqueItems(this.intervalIds)
  }
  onToggleDone(id) {
    this.stopTimer(id)
    this.setState(({ todosData }) => {
      const idx = todosData.findIndex((el) => el.id === id)
      const oldItem = todosData[idx]
      const newItem = { ...oldItem, done: !oldItem.done }
      const newArray = [
        ...todosData.slice(0, idx),
        newItem,
        ...todosData.slice(idx + 1)
      ]
      return {
        todosData: newArray
      }
    })
  }

  changeCheck(id) {
    this.setState(({ todosData }) => {
      const idx = todosData.findIndex((el) => el.id === id)
      const oldItem = todosData[idx]
      const newItem = { ...oldItem, isChecked: !oldItem.isChecked }
      const newArray = [
        ...todosData.slice(0, idx),
        newItem,
        ...todosData.slice(idx + 1)
      ]
      return {
        todosData: newArray
      }
    })
  }

  changeFilter(data) {
    this.setState({ filter: data })
  }

  filteredItems() {
    const { todosData, filter } = this.state
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

  clearCompleted() {
    this.setState(({ todosData }) => {
      const newArray = todosData.filter((e) => !e.done)
      return {
        todosData: newArray
      }
    })
  }

  deleteItem(id) {
    this.setState(({ todosData }) => {
      const idx = todosData.findIndex((el) => el.id === id)
      const newArray = todosData.toSpliced(idx, 1)
      return {
        todosData: newArray
      }
    })
  }

  startTimer = (id) => {
    const item = this.state.todosData.find((e) => e.id === id)
    const ids = this.intervalIds.find((e) => e.id === id)
    let arr = []
    arr.push(ids)
    item.paused = false

    if (!item.started && arr.length === 1) {
      this.intervalId = setInterval(() => {
        item.time = item.time - 1000
        console.log(this.intervalIds, item.started)
      }, 1000)
    }
    item.started = true
    if (item) {
      item.interval = this.intervalId
    }
    if (!ids) {
      this.intervalIds.push({ id: id, interval: this.intervalId })
      this.intervalArr.push(this.intervalId)
    }
  }

  stopTimer = (id) => {
    const item = this.state.todosData.find((e) => e.id === id)
    console.log(item.started)
    clearInterval(item.interval)
    console.log(this.intervalIds)

    item.paused = true
    item.started = false
  }
  render() {
    const { todosData, filter, time } = this.state
    const todoCount = todosData.filter((el) => !el.done).length

    const addItem = (text) => {
      const { min, sec } = this.state
      const newItem = {
        name: text,
        id: this.maxId++,
        done: false,
        isChecked: false,
        date: new Date(),
        time: min * 60 * 1000 + sec * 1000,
        paused: true,
        interval: 0,
        started: false
      }
      this.setState(
        ({ todosData }) => ({
          todosData: [newItem, ...todosData]
        }),
        () => console.log(this.state.todosData)
      )
    }

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <TaskForm
            onAdd={addItem.bind(this)}
            handleMin={this.handleMin}
            handleSec={this.handleSec}
          />
        </header>
        <section className="main">
          <TaskList
            todos={this.filteredItems()}
            onDelete={this.deleteItem.bind(this)}
            changeCheck={this.changeCheck.bind(this)}
            onToggleDone={this.onToggleDone.bind(this)}
            time={time}
            startTimer={this.startTimer}
            stopTimer={this.stopTimer}
            handleStarted={this.handleStarted}
          />
          <Footer
            todo={todoCount}
            todos={todosData}
            filter={filter}
            changeFilter={this.changeFilter.bind(this)}
            clearCompleted={this.clearCompleted.bind(this)}
          />
        </section>
      </section>
    )
  }
}
