import React from "react"
import PropTypes from "prop-types"
import "./tasks-filters.css"
function Filters({ changeFilter, filter }) {
  return (
    <ul className="filters">
      <li>
        <button type="button" className={filter === "All" ? "selected" : ""} onClick={() => changeFilter("All")}>
          All
        </button>
      </li>
      <li>
        <button type="button" className={filter === "Active" ? "selected" : ""} onClick={() => changeFilter("Active")}>
          Active
        </button>
      </li>
      <li>
        <button
          type="button"
          className={filter === "Completed" ? "selected" : ""}
          onClick={() => changeFilter("Completed")}
        >
          Completed
        </button>
      </li>
    </ul>
  )
}
Filters.propTypes = {
  filter: PropTypes.string,
  changeFilter: PropTypes.func.isRequired
}
Filters.defaultProps = {
  filter: "All"
}
export default Filters
