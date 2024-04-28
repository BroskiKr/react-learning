import axios from "axios";

export default class UserService {
  static async getAll(limit = 10, page = 1) {
    const response = await axios.get('http://127.0.0.1:8000/users')
    return response;
  }
  static async deleteUser(id) {
    const deleteQuery = await axios.delete('http://127.0.0.1:8000/users/' + id)
  }

  static async getById(id) {
    const response = await axios.get('http://127.0.0.1:8000/users/' + id)
    return response;
  }

  static async createUser(user) {
    console.log(user);
    const response = await axios.post('http://127.0.0.1:8000/users', user)
    user = response.data
    return user
  }

}