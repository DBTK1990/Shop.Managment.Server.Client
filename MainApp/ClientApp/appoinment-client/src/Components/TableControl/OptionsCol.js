import { Component } from "react";
import delete_icon from "../../assets/delete.svg";
import edit_icon from "../../assets/edit.svg";
import notyours_icon from "../../assets/notyours.svg";

class OptionsCol extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  ui_delete = () => {
    this.props.delete(this.props.assignId);
  };
  ui_edit = () => {
    let date = this.props.data_rows.find((el) => el.id === this.props.assignId);
    this.props.openAppointmentModel("edit", this.props.assignId, date.date_Set);
  };
  render() {
    const { restricted } = this.props;
    return (
      <td align="center">
        {restricted ? (
          <>
            <img
              alt="delete_icon"
              onClick={this.ui_delete}
              width="25"
              src={delete_icon}
            />
            <img
              alt="edit_icon"
              onClick={this.ui_edit}
              className="pl-1"
              width="25"
              src={edit_icon}
            />
          </>
        ) : (
          <>
            <img
              alt="not_yours_icon"
              className="pl-1"
              width="25"
              src={notyours_icon}
            />
          </>
        )}
      </td>
    );
  }
}

export default OptionsCol;
