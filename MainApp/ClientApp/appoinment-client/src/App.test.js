import { render, screen } from "@testing-library/react";
import App from "./App";
import { LoginModel } from "./Services/AuthService/AuthModel";
import { AuthService } from "./Services/AuthService/AuthService";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test("is login  service works", () => {
  const auth = new AuthService();
  const login = new LoginModel();
  login.username = "dbtk";
  login.password = "Dbtk1234.";
  return auth.getTokenByLoginCredentials(login).then((data) => {
    console.log(data);
  });
});
