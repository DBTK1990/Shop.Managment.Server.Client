import axios from "axios";

export default class AppointmentService {
  constructor(token) {
    this.baseAddress = "https://localhost:5001/";
    this.controllerUri = "v1/api/appointments/";
    this.paths = ["pager", "details", "create", "edit", "delete"];
    this.config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  getListByPage(page_number, filter = "date", order = 1) {
    var url = `${this.baseAddress}${this.controllerUri}${this.paths[0]}/${page_number}`;

    return axios.post(url, { order, filter }, this.config);
  }
  getDetailsById(id) {
    var url = `${this.baseAddress}${this.controllerUri}${this.paths[1]}`;
    return axios.get(url, this.config);
  }
  create(appointment_date) {
    // if (!Date.parse(appointment_date)) {
    //   throw new Error("function signature prop is not from type Date");
    // }
    var url = `${this.baseAddress}${this.controllerUri}${this.paths[2]}`;
    return axios.post(url, { date_set: appointment_date }, this.config);
  }
  edit(id, appointment_date) {
    if (!(appointment_date instanceof Date)) {
      throw new Error("function signature prop is not from type Date");
    }
    var url = `${this.baseAddress}${this.controllerUri}${this.paths[3]}/${id}`;
    return axios.put(url, { date_set: appointment_date }, this.config);
  }
  delete(id) {
    if (typeof id !== "number") {
      throw new Error("function signature prop is not from type Number");
    }
    var url = `${this.baseAddress}${this.controllerUri}${this.paths[4]}/${id}`;
    return axios.delete(url, this.config);
  }
}
