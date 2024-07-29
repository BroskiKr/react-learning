import React, { useContext, useEffect, useRef, useState } from "react";
import '../styles/Page.css'
import PostList from "../components/PostsComp/PostList";
import PostForm from "../components/PostsComp/PostForm";
import PostFilter from "../components/PostsComp/PostFilter";
import MyModal from "../components/Ui/MyModal/MyModal";
import MyButton from "../components/Ui/button/MyButton";
import { usePosts } from "../hooks/useSortPosts";
import PostService from "../API/PostService";
import Loader from "../components/Ui/Loader/Loader";
import { useFetching } from "../hooks/useFetching";
import { getPageCount } from "../utils/pages";
import { useObserver } from "../hooks/useObserver";
import MySelect from "../components/Ui/select/MySelect";
import { AuthContext } from "../context";

function Posts() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({ sort: '', query: '' })
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)

  const { token } = useContext(AuthContext)

  const lastPageEl = useRef()

  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(token, limit, page);
    setPosts(() => {
      const responsePosts = response.data
      return [...posts, ...responsePosts]
    })
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))
  })

  useObserver(lastPageEl, page < totalPages, isPostsLoading, () => {
    setPage(page + 1)
  })


  useEffect(() => {
    fetchPosts(limit, page)
  }, [page, limit])

  const createPost = async (post) => {
    const newPost = await PostService.createPost(post, token)
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = async (post) => {
    await PostService.deletePost(post.id, token)
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const generatePosts = async () => {
    console.log(token)
    console.log('we are in posts page')
    const response = await PostService.generatePosts(token)
    const generatedPosts = response.data
    setPosts([...posts, ...generatedPosts])
  }

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  return (
    <div className="App">
      <MyButton style={{ marginTop: 5 }} onClick={() => setModal(true)}>Створити пост</MyButton>
      <MyButton style={{ margin: '5px 0 0 20px', }} onClick={() => generatePosts()} >Автоматично згенерувати пости</MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: '15px 0' }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      <h3 style={{ marginTop: 7, fontSize: 16 }}
      >Кількість елементів на сторінці</h3>
      <MySelect
        value={limit}
        onChange={(value) => setLimit(value)}
        options={[
          { value: 5, name: '5' },
          { value: 10, name: '10' },
          { value: 25, name: '25' },
          { value: -1, name: 'Показати всі' }
        ]} />
      {postError && <h1 style={{ fontSize: 50, textAlign: 'center', margin: '15px 0 15px 0' }} >Сталася помилка: {postError}</h1>}
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Список постів' />
      <div ref={lastPageEl} style={{ height: 10, visibility: 'hidden' }}></div>
      {isPostsLoading && <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}><Loader /></div>}
    </div >
  );
}

export default Posts;
