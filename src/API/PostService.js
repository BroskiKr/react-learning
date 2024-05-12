import axios from "axios";

export default class PostService {
  static async getAll(token, limit = 10, page = 1) {
    const response = await axios.get('http://127.0.0.1:8000/posts',
      { headers: { 'Authorization': `${token.token_type} ${token.access_token}` } }
      // {
      //   params: {
      //     _limit: limit,
      //     _page: page,
      //   }
      // }
    )
    return response;
  }
  static async deletePost(id, token) {
    const deleteQuery = await axios.delete('http://127.0.0.1:8000/posts/' + id,
      { headers: { 'Authorization': `${token.token_type} ${token.access_token}` } })
  }

  static async getById(id, token) {
    const response = await axios.get('http://127.0.0.1:8000/posts/' + id,
      { headers: { 'Authorization': `${token.token_type} ${token.access_token}` } })
    return response;
  }

  static async createPost(post, token) {
    post.owner_id = 1
    const response = await axios.post('http://127.0.0.1:8000/posts', post,
      { headers: { 'Authorization': `${token.token_type} ${token.access_token}` } })
    post = response.data
    return post
  }

  static async getCommentsByPostId(id) {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/' + id + '/comments')
    return response;
  }

}