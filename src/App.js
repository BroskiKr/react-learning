import React, { useMemo, useState } from "react";
import './styles/App.css'
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/Ui/MyModal/MyModal";
import MyButton from "./components/Ui/button/MyButton";

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'cc', body: 'bb', },
    { id: 2, title: 'aa', body: 'cc', },
    { id: 3, title: 'bb', body: 'aa', }
  ])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const [filter, setFilter] = useState({ sort: '', query: '' })

  const [modal, setModal] = useState(false)

  const sortedPosts = useMemo(() => {
    if (filter.sort) {
      return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
    }
    return posts;
  }, [filter.sort, posts])

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
  }, [filter.query, sortedPosts])

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
