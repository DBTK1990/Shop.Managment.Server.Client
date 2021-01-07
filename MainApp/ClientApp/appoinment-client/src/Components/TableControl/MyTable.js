import React, { Component } from "react";
import { Table, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import Pager from "./Pager";
import MyRows from "./MyRows";

export class MyTable extends Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <Container>
        <Row>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
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
        <Row>
          <Pager pager={this.props.pager} count={this.props.page_count} />
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  this_user: state.token.username,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MyTable);
