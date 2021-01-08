import React, { Component } from "react";
import { Table, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import Pager from "./Pager";
import MyRows from "./MyRows";
import { filterTableToggle } from "../../Store/Slices/siteSlice";

class MyTable extends Component {
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
    const { page_num, pagerQuery } = this.props;
    this.props.toggleFilterStore(key);
    this.props.pager(page_num, pagerQuery.filter, pagerQuery.order);
  };

  render() {
    const { pager, page_count } = this.props;
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
              <MyRows {...this.props}></MyRows>
            </tbody>
          </Table>
        </Row>
        <Row className="justify-content-center">
          <Pager pager={pager} count={page_count} />
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
