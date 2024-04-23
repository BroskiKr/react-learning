import axios from "axios";

export default class PostService {
  static async getAll(limit = 10, page = 1) {
    const response = await axios.get('http://127.0.0.1:8000/posts', {
      params: {
        _limit: limit,
        _page: page,
      }
    })
    return response;
  }
  static async deletePost(id) {
    const deleteQuery = await axios.delete('http://127.0.0.1:8000/posts/' + id)
  }

  static async getById(id) {
    const response = await axios.get('http://127.0.0.1:8000/posts/' + id)
    return response;
  }

  static async createPost(post) {
    post.owner_id = 1
    const response = await axios.post('http://127.0.0.1:8000/posts', post)
    post = response.data
    return post
  }

  static async getCommentsByPostId(id) {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/' + id + '/comments')
    return response;
  }

}