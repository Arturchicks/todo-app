import React, { Component } from "react"

import Footer from "../Footer/footer"
import TaskForm from "../NewTaskForm/new-task-form"
import TaskList from "../TaskList/task-list"

export default class App extends Component {
  constructor() {
    super()
    this.maxId = 100
    this.state = {
      todosData: [],
      filter: "All",
    }
  }

  onToggleDone(id) {
    this.setState(({ todosData }) => {
      const idx = todosData.findIndex((el) => el.id === id)
      const oldItem = todosData[idx]
      const newItem = { ...oldItem, done: !oldItem.done }
      const newArray = [...todosData.slice(0, idx), newItem, ...todosData.slice(idx + 1)]
      return {
        todosData: newArray,
      }
    })
  }

  changeCheck(id) {
    this.setState(({ todosData }) => {
      const idx = todosData.findIndex((el) => el.id === id)
      const oldItem = todosData[idx]
      const newItem = { ...oldItem, isChecked: !oldItem.isChecked }
      const newArray = [...todosData.slice(0, idx), newItem, ...todosData.slice(idx + 1)]
      return {
        todosData: newArray,
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
        todosData: newArray,
      }
    })
  }

  deleteItem(id) {
    this.setState(({ todosData }) => {
      const idx = todosData.findIndex((el) => el.id === id)
      const newArray = todosData.toSpliced(idx, 1)
      return {
        todosData: newArray,
      }
    })
  }

  addItem(text) {
    const newItem = {
      name: text,
      id: this.maxId++,
      done: false,
      isChecked: false,
      date: new Date(),
    }
    this.setState(({ todosData }) => ({
      todosData: [newItem, ...todosData],
    }))
  }

  render() {
    const { todosData, filter } = this.state
    const todoCount = todosData.filter((el) => !el.done).length
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <TaskForm onAdd={this.addItem.bind(this)} />
        </header>
        <section className="main">
          <TaskList
            todos={this.filteredItems()}
            onDelete={this.deleteItem.bind(this)}
            changeCheck={this.changeCheck.bind(this)}
            onToggleDone={this.onToggleDone.bind(this)}
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
