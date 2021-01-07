import axios from "axios";
import { LoginModel, RegisterModel } from "./AuthModel";

class AuthService {
  constructor() {
    this.baseAddress = "https://localhost:5001/";
    this.controllerUri = "v1/api/authenticate/";
    this.paths = ["login", "refresh", "validate", "register"];
  }

  getTokenByLoginCredentials(login_model) {
    if (!(login_model instanceof LoginModel)) {
      throw new Error("function signature prop is not from type LoginModel");
    }
    var url = `${this.baseAddress}${this.controllerUri}${this.paths[0]}`;

    return axios.post(url, login_model);
  }

  getTokenByRefreshToken(ref_token) {
    if (typeof ref_token !== "string") {
      throw new Error("function signature prop is not from type string");
    }
    var url = `${this.baseAddress}${this.controllerUri}${this.paths[1]}`;

    var data = new FormData();
    data.append("refresh_token", ref_token);

    return axios.post(url, data);
  }

  isTokenValid(token) {
    if (typeof ref_token !== "string") {
      throw new Error("function signature prop is not from type string");
    }
    var url = `${this.baseAddress}${this.controllerUri}${this.paths[2]}`;

    var data = new FormData();
    data.append("token", token);

    return axios.post(url, data);
  }

  Register(register_model) {
    if (!(register_model instanceof RegisterModel)) {
      throw new Error(
        "function signature prop register_model is not from type RegisterModel"
      );
    }
    var url = `${this.baseAddress}${this.controllerUri}${this.paths[3]}`;

    return axios.post(url, register_model);
  }
}

export default new AuthService();
