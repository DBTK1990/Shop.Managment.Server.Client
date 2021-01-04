export class LoginModel {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    //implementation
  }
  username = "";
  password = "";
}
export class RegisterModel extends LoginModel {
  constructor(username, password, email) {
    super(username, password);
    this.email = email;

    //implementation
  }
  email = "";
}
