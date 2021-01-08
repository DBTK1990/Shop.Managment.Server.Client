import React from "react";
import { Container, Nav, Navbar, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Link, Route, Switch } from "react-router-dom";
import Logout from "../Components/Logout";
import { openLogout } from "../Store/Slices/siteSlice";
import AppointmentView from "./Views/AppointmentView";
import { WelcomeView } from "./Views/WelcomeView";

class HomePage extends React.Component {
  constructor(props) {
    super();
    this.state = { logout: props.logout_model };
  }
  openLogout = () => {
    this.props.openLogout();
  };

  render() {
    const { username, logout_model } = this.props;
    const style = { position: "relative" };
    return (
      <div style={style}>
        <Logout show={logout_model}></Logout>
        <Navbar bg="dark" variant="dark">
          <Link className="navbar-brand" to="/home">
            Dog Barber
          </Link>

          <Nav className="mr-auto">
            <Link className="nav-link" to="/home/Appointments">
              Appointments
            </Link>
            <Nav.Link onClick={this.openLogout}>Log-out</Nav.Link>
          </Nav>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="home">{username}</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
        <Container>
          <Row>
            <Switch>
              <Route path="/home/appointments">
                <AppointmentView {...this.props} />
              </Route>
              <Route path="/home">
                <WelcomeView />
              </Route>
              <Route path="*">
                <WelcomeView />
              </Route>
            </Switch>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    logout_model: state.token.logout_model,
    username: state.token.username,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    openLogout: () => dispatch(openLogout()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
