import React, { Component } from "react";
import OptionsCol from "./OptionsCol";

export default class MyRows extends Component {
  constructor(props) {
    super();
  }
  render() {
    const { data_rows, this_user } = this.props;
    return data_rows
      ? data_rows.map((el) => {
          return (
            <tr key={el.id}>
              <td>{el.username}</td>
              <td>{new Date(el.date_Set).toDateString()}</td>
              <td>{new Date(el.date_Set).toTimeString()}</td>
              <OptionsCol
                {...this.props}
                assignId={el.id}
                restricted={el.username === this_user}
              />
            </tr>
          );
        })
      : "";
  }
}
