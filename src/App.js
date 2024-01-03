import React, { useRef, useState } from "react";
import './styles/App.css'
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'javascript', body: 'Description', },
    { id: 2, title: 'javascript 2', body: 'Description', },
    { id: 3, title: 'Guvno', body: 'it is brown giant mostly made on toilet', }
  ])
  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }
  return (
    <div className="App">
      <PostForm create={createPost} />
      <hr style={{ margin: '15px 0' }} />
      <div>
        <select>
          <option value='value1'>За назвою</option>
          <option value='value1'>За описом</option>

        </select>
      </div>
      {posts.length
        ? <PostList remove={removePost} posts={posts} title='Пости про js' />
        : <h1 style={{ textAlign: 'center', fontSize: '36px', fontWeight: '700' }}>Разраби підараси</h1>
      }
    </div >
  );
}

export default App;
