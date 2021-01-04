import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./Pages/LoginPage";
import "bootstrap/dist/css/bootstrap.min.css";

import { Row, Col, Container } from "react-bootstrap";

function App() {
  return (
    <Container>
      <Row style={{ height: "25vh" }}></Row>
      <Row></Row>
      <Row>
        <Col>
          <LoginPage></LoginPage>
        </Col>
      </Row>
      <Row></Row>
    </Container>
  );
}

export default App;
