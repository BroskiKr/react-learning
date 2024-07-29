import MyButton from "../Ui/button/MyButton";
import { useNavigate } from "react-router-dom";


const PostItem = ({ post, remove, index }) => {
  const router = useNavigate()
  return (
    <div className="post">
      <div className="post__content">
        <strong >{index + 1}. {post.title}</strong>
        <div>
          {post.body}
        </div>
      </div>
      <div className="post__btns">
        <MyButton onClick={() => router(`/posts/${post.id}`)}>Open</MyButton>
        <MyButton onClick={() => remove(post)}>Delete</MyButton>
      </div>
    </div>
  )
}

export default PostItem;