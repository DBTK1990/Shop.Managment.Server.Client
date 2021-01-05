import { LoginModel, RegisterModel } from "./AuthModel";

class AuthService {
  constructor() {
    this.baseAddress = "https://localhost:5001/";
    this.controllerUri = "v1/api/Authenticate/";
    this.paths = ["login", "refresh", "validate", "register"];
  }

  async getTokenByLoginCredentials(login_model) {
    if (!(login_model instanceof LoginModel)) {
      throw new Error("function signature prop is not from type LoginModel");
    }
    var url = `${this.baseAddress}${this.controllerUri}${this.paths[0]}`;
    var requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login_model),
    };

    return await fetch(url, requestOptions);
  }

  async getTokenByRefreshToken(ref_token) {
    var response = null;
    try {
      if (typeof ref_token !== "string") {
        throw new Error("function signature prop is not from type string");
      }
      var url = `${this.baseAddress}${this.controllerUri}${this.paths[1]}`;
      var data = new FormData();
      data.append("refresh_token", ref_token);
      var requestOptions = {
        method: "POST",
        body: data,
      };
      response = await fetch(url, requestOptions);
      return response;
    } catch (err) {
      response = err;
    }
    return response;
  }

  async isTokenValid(token) {
    var response = null;
    try {
      if (typeof ref_token !== "string") {
        throw new Error("function signature prop is not from type string");
      }
      var url = `${this.baseAddress}${this.controllerUri}${this.paths[2]}`;
      var data = new FormData();
      data.append("token", token);
      var requestOptions = {
        method: "POST",
        body: data,
      };
      response = await fetch(url, requestOptions);
      return response;
    } catch (err) {
      response = err;
    }
    return response;
  }

  async Register(register_model) {
    var response = null;
    try {
      if (!(register_model instanceof RegisterModel)) {
        throw new Error(
          "function signature prop register_model is not from type RegisterModel"
        );
      }
      var url = `${this.baseAddress}${this.controllerUri}${this.paths[3]}`;
      var data = JSON.stringify(register_model);

      var requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      };
      response = await fetch(url, requestOptions);
      return response;
    } catch (err) {
      response = err;
    }
    return response;
  }
}

export default new AuthService();
