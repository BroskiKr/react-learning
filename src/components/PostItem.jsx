import React from "react";
import MyButton from "./Ui/button/MyButton";
import { useNavigate } from "react-router-dom";
import PostService from "../API/PostService";

const deletePost = async (post, removePost) => {
  await PostService.deletePost(post.id)
  removePost(post)
}

const PostItem = (props) => {
  const router = useNavigate()
  return (
    <div className="post">
      <div className="post__content">
        <strong >{props.post.id}. {props.post.title}</strong>
        <div>
          {props.post.body}
        </div>
      </div>
      <div className="post__btns">
        <MyButton onClick={() => router(`/posts/${props.post.id}`)}>Open</MyButton>
        <MyButton onClick={() => deletePost(props.post, props.remove)}>Delete</MyButton>
      </div>
    </div>
  )
}

export default PostItem;