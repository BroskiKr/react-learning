import { useParams } from "react-router-dom";
const PostIdPage = () => {
  const params = useParams()
  return (
    <h1>
      Ви відкрили сторінку користувача з Id = {params.id}
    </h1>
  );
}

export default PostIdPage;