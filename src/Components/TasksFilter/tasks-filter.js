import React from "react";
import PropTypes from "prop-types";

function Filters(props) {
  const { changeFilter, filter } = props;
  return (
    <ul className="filters">
      <li>
        <button type="button" className={filter === "All" ? "selected" : ""} onClick={() => changeFilter("All")}>
          All
        </button>
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
  );
}
Filters.propTypes = {
  filter: PropTypes.string,
  changeFilter: PropTypes.func.isRequired,
};

Filters.defaultProps = {
  filter: "All",
};
export default Filters;
