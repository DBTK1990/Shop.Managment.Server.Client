import React, { Component } from "react";
import { Table, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import Pager from "./Pager";
import MyRows from "./MyRows";
import { filterTableToggle } from "../../Store/Slices/siteSlice";

export class MyTable extends Component {
  constructor(props) {
    super();
    this.state = {
      filter: "date",
      order: 1,
    };
    props.pager(props.page_num);
  }

  toggleFilter = (e) => {
    const { key } = e.currentTarget.dataset;
    this.props.toggleFilterStore(key);
    this.props.pager(
      this.props.page_num,
      this.props.pagerQuery.filter,
      this.props.pagerQuery.order
    );
  };

  render() {
    return (
      <Container>
        <Row>
          <Table striped bordered hover size="sm">
            <thead>
              <tr align="center">
                <th data-key="name" onClick={this.toggleFilter}>
                  Name
                </th>
                <th data-key="date" onClick={this.toggleFilter}>
                  Date
                </th>
                <th>Time</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              <MyRows
                {...this.props}
                data_rows={this.props.row_data}
                this_user={this.props.this_user}
              ></MyRows>
            </tbody>
          </Table>
        </Row>
        <Row className="justify-content-center">
          <Pager pager={this.props.pager} count={this.props.page_count} />
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  this_user: state.token.username,
  page_num: state.token.table_page_num,
  pagerQuery: state.token.pagerQuery,
});

const mapDispatchToProps = (dispatch) => {
  return {
    toggleFilterStore: (key) => {
      dispatch(filterTableToggle(key));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyTable);
