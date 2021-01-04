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
    return <span>{render}</span>;
  }
}
const mapStateToProps = (state) => {
  return {
    tokenResponse: state.token.tokenResponse,
    isLoaded: state.token.isLoaded,
    isFail: state.token.isFail,
    isConnected: state.token.isConnected,
    register: state.token.register,
  };
};

export default connect(mapStateToProps)(LoginPage);
