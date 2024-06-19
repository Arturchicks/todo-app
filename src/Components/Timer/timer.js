import React, { Component } from "react"
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import "./timer.css"
export default class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todoDate: props.date.getTime()
    }
  }
  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({
        todoDate: prevState.todoDate + 100
      }))
    }, 1000)
  }
  componentWillUnmount() {
    clearInterval(this.intervalId)
  }
  render() {
    const { todoDate } = this.state
    return (
      <span className="created">
        {`created ${formatDistanceToNow(new Date(todoDate), {
          includeSeconds: true,
          addSuffix: true
        })}`}
      </span>
    )
  }
}
