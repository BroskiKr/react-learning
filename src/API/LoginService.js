import axios from "axios";

export default class LoginService {
  static async login(credentials) {
    const access_token = await axios.post('http://127.0.0.1:8000/login', credentials)
    return access_token
  }

  static async getGoogleLoginUrl() {
    const response = await axios.get('http://127.0.0.1:8000/login/google')
    const url = response.data.url
    return url
  }

  static async googleLogin(code) {
    const response = await axios.get(`http://127.0.0.1:8000/auth/google?code=${code}`);
    const token = response.data;
    return token
  }
}