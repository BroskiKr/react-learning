import axios from "axios";

export default class UserService {
  static async getAll(token, limit = 10, page = 1) {
    const response = await axios.get('http://127.0.0.1:8000/users',
      {
        headers: { 'Authorization': `${token.token_type} ${token.access_token}` },
        params: {
          limit: limit,
          page: page,
        }
      })
    return response;
  }
  static async deleteUser(id, token) {
    const deleteQuery = await axios.delete('http://127.0.0.1:8000/users/' + id,
      { headers: { 'Authorization': `${token.token_type} ${token.access_token}` } })
  }

  static async getById(token, id = 'current') {
    const response = await axios.get('http://127.0.0.1:8000/users/' + id,
      { headers: { 'Authorization': `${token.token_type} ${token.access_token}` } })
    return response;
  }

  static async createUser(user, token) {
    const response = await axios.post('http://127.0.0.1:8000/users', user,
      { headers: { 'Authorization': `${token.token_type} ${token.access_token}` } })
    user = response.data
    return user
  }
}