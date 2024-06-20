import React, { useEffect, useState } from "react"
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import "./timer.css"
function Timer({ date }) {
  const [todoDate, setTodoDate] = useState(date.getTime())
  let intervalId
  useEffect(() => {
    intervalId = setInterval(() => {
      setTodoDate((prevState) => (prevState += 100))
    }, 1000)
  }, [])
  useEffect(() => {
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <span className="created">
      {`created ${formatDistanceToNow(new Date(todoDate), {
        includeSeconds: true,
        addSuffix: true
      })}`}
    </span>
  )
}
export default Timer
