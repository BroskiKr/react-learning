import React, { useEffect, useRef, useState } from "react";
import '../styles/Page.css'
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/Ui/MyModal/MyModal";
import MyButton from "../components/Ui/button/MyButton";
import { usePosts } from "../hooks/usePosts";
import PostService from "../API/PostService";
import Loader from "../components/Ui/Loader/Loader";
import { useFetching } from "../hooks/useFetching";
import { getPageCount } from "../utils/pages";
import Pagination from "../components/Ui/Pagination/Pagination";
import { useObserver } from "../hooks/useObserver";
import MySelect from "../components/Ui/select/MySelect";

function Posts() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({ sort: '', query: '' })
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)

  const lastPageEl = useRef()

  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data])
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))
  })

  useObserver(lastPageEl, page < totalPages, isPostsLoading, () => {
    setPage(page + 1)
  })

  useEffect(() => {
    fetchPosts(limit, page)
  }, [page, limit])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (p) => {
    setPage(p)
  }

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  return (
    <div className="App">
      <MyButton style={{ marginTop: 5 }} onClick={() => setModal(true)}>Створити користувача</MyButton>
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
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Пости про js' />
      <div ref={lastPageEl} style={{ height: 10, visibility: 'hidden' }}></div>
      {isPostsLoading && <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}><Loader /></div>}
      <Pagination setFilter={setFilter} totalPages={totalPages} page={page} changePage={changePage} />
    </div >
  );
}

export default Posts;
