import { Component } from "react";
import { Pagination } from "react-bootstrap";

export default class Pager extends Component {
  constructor(props) {
    super();
    this.state = {
      selected: 1,
    };
  }
  moveToPage = (key, e) => {
    this.setState({ selected: key });
    this.props.pager(key);
  };
  render() {
    const { count } = this.props;
    const repeater = [];
    for (let index = 0; index < count; index++) {
      repeater.push(index + 1);
    }

    return (
      <Pagination>
        {repeater.map((el) => {
          return (
            <Pagination.Item
              onClick={this.moveToPage.bind(null, el)}
              key={el}
              active={this.state.selected === el}
            >
              {el}
            </Pagination.Item>
          );
        })}
      </Pagination>
    );
  }
}
