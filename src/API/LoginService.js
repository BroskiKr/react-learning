import axios from "axios";

export default class LoginService {
  static async login(credentials) {
    const access_token = await axios.post('http://127.0.0.1:8000/login', credentials)
    return access_token
  }
}