import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostService from "../API/PostService";
import { useFetching } from "../hooks/useFetching";
import Loader from "../components/Ui/Loader/Loader";

const PostIdPage = () => {
  const params = useParams()
  const [post, setPost] = useState({})
  const [comments, setComments] = useState([])


  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id)
    setPost(response.data)
  })

  const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
    const response = await PostService.getCommentsByPostId(id)
    setComments(response.data)
  })

  useEffect(() => {
    fetchPostById(params.id)
    fetchComments(params.id)
  }, [])
  return (
    <div style={{ fontSize: '25px', marginTop: '20px', width: 900 }}>
      <h1 style={{ fontWeight: 'bold' }}>Ви відкрили сторінку поста :</h1>
      {isLoading
        ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}><Loader /></div>
        : <div >{post.id}. {post.title}</div>
      }
      <h1 style={{ marginTop: 30, fontWeight: 'bold' }}> Коментарі:</h1>
      {isLoading
        ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}><Loader /></div>
        : <>{comments.map((com) =>
          <div key={com.email} style={{ marginTop: 10 }}>
            <h2>{com.email}</h2>
            <p>{com.body}</p>
          </div>
        )}</>
      }
    </div>
  );
}

export default PostIdPage;