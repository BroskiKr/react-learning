import React, { useState } from "react";
import MyInput from './Ui/input/MyInput'
import MyButton from './Ui/button/MyButton'
import PostService from "../API/PostService";

const PostForm = ({ create }) => {
  const [post, setPost] = useState({ title: '', body: '' })

  const addNewPost = async (e) => {
    e.preventDefault()
    if (post.title == false || post.body == false) {
      return 0
    }
    const newPost = await PostService.createPost(post)
    create(newPost)
    setPost({ title: '', body: '' })
  }

  return (
    <form>
      <MyInput onChange={e => setPost({ ...post, title: e.target.value })} value={post.title} type="text" placeholder="Назва поста" />
      <MyInput onChange={e => setPost({ ...post, body: e.target.value })} value={post.body} type="text" placeholder="Опис поста" />
      <MyButton onClick={addNewPost} >Створити пост</MyButton>
    </form>
  )
}

export default PostForm;