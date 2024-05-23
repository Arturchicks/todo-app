import React, { Component } from "react";
import PropTypes from "prop-types";

import Timer from "../Timer/timer";

export default class Task extends Component {
  constructor() {
    super();
    // const { date } = this.props;
    this.state = {
      edit: false,
      value: "",
    };
  }

  render() {
    const { name, onDelete, changeCheck, isChecked, onToggleDone, done, date } =
      this.props;
    const { edit, value } = this.state;
    const handleClick = () => {
      changeCheck();
      onToggleDone();
    };

    let tag;

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
                edit: !edit,
              });
            }
          }}
        />
      );
    }
    let val;
    if (value === "") {
      val = name;
    } else {
      val = value;
    }
    if (!edit) {
      tag = (
        <li className={`${done ? "task completed" : "task"}`}>
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={isChecked}
              onChange={onToggleDone}
              onClick={changeCheck}
            />
            <label>
              <span className="description" onClick={handleClick}>
                {val}
              </span>
              <div>
                <Timer date={date} />
              </div>
            </label>
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
          </div>
        </li>
      );
    }
    return tag;
  }
}

Task.propTypes = {
  name: PropTypes.string.isRequired,
  done: PropTypes.bool,
  isChecked: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  changeCheck: PropTypes.func.isRequired,
};

Task.defaultProps = {
  done: false,
  isChecked: false,
};
