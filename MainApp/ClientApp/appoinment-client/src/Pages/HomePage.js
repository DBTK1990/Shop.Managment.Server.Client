import React from "react";
import { connect } from "react-redux";

class HomePage extends React.Component {
  constructor(props) {
    super();
    //implementation
  }
  render() {
    return <div>hello world</div>;
  }
}

export default connect()(HomePage);
