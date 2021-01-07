import { Component } from "react";
import delete_icon from "../../assets/delete.svg";
import edit_icon from "../../assets/edit.svg";
import show_icon from "../../assets/show.svg";

class OptionsCol extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  ui_delete = () => {
    this.props.delete(this.props.assignId);
  };
  ui_edit = () => {
    this.props.openAppointmentModel("edit", this.props.assignId);
  };
  ui_show = () => {};
  render() {
    const { restricted } = this.props;
    return (
      <td align="center">
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
      </td>
    );
  }
}

export default OptionsCol;
