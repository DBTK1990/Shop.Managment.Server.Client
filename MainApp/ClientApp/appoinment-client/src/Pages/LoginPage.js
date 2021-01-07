import React from "react";
import LoginForm from "../Components/LoginForm";
import RegisterForm from "../Components/RegisterForm";
import { connect } from "react-redux";
class LoginPage extends React.Component {
  constructor(props) {
    super();
    this.state = { register: false };
  }
  render() {
    var render;

    console.log(this.state);
    if (!this.props.register) {
      render = <LoginForm></LoginForm>;
    } else {
      render = <RegisterForm></RegisterForm>;
    }
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        {render}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    register: state.token.register_model,
  };
};

export default connect(mapStateToProps)(LoginPage);
