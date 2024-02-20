import React, { useEffect, useState } from "react";
import './styles/App.css'
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/Ui/MyModal/MyModal";
import MyButton from "./components/Ui/button/MyButton";
import { usePosts } from "./hooks/usePosts";
import PostService from "./API/PostService";

function App() {
  const [posts, setPosts] = useState([])

  async function fetchPosts() {
    const posts = await PostService.getAll();
    setPosts(posts)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const [filter, setFilter] = useState({ sort: '', query: '' })
  const [modal, setModal] = useState(false)

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  return (
    <div className="App">
      <MyButton style={{ marginTop: 5 }} onClick={() => setModal(true)}>Створити користувача</MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: '15px 0' }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Пости про js' />
    </div >
  );
}

export default App;
