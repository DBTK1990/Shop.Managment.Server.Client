import React, { Component } from "react";
import OptionsCol from "./OptionsCol";

export default class MyRows extends Component {
  constructor(props) {
    super();
  }

  render() {
    const { row_data, this_user } = this.props;
    return row_data
      ? row_data.map((el) => {
          return (
            <tr align="center" key={el.id}>
              <td>{el.username}</td>
              <td>{new Date(el.date_Set).toDateString()}</td>
              <td>{new Date(el.date_Set).toLocaleTimeString("he")}</td>
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
