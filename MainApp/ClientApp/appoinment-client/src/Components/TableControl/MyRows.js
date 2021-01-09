import React, { Component } from "react";
import OptionsCol from "./OptionsCol";
import datetime from "date-and-time";

export default class MyRows extends Component {
  constructor(props) {
    super();
  }
  convertDateToUserUI(date, mode) {
    var format = mode === "time" ? "HH:mm:ss" : "DD-MM-YYYY";
    return datetime.format(date, format);
  }
  render() {
    const { row_data, this_user } = this.props;

    return row_data
      ? row_data.map((el) => {
          return (
            <tr align="center" key={el.id}>
              <td>{el.username}</td>
              <td>{this.convertDateToUserUI(new Date(el.date_Set), "date")}</td>
              <td>{this.convertDateToUserUI(new Date(el.date_Set), "time")}</td>
              <OptionsCol
                {...this.props}
                assignId={el.id}
                restricted={el.username === this_user}
              />
            </tr>
          );
        })
      : null;
  }
}
