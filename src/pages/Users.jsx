import React, { useContext, useEffect, useRef, useState } from "react";
import UserService from "../API/UserService"
import { useFetching } from "../hooks/useFetching";
import { getPageCount } from "../utils/pages";
import { useUsers } from "../hooks/useSortUsers";
import MyModal from "../components/Ui/MyModal/MyModal";
import UserForm from "../components/UsersComp/UserForm";
import UserFilter from "../components/UsersComp/UserFilter";
import MyButton from "../components/Ui/button/MyButton";
import Loader from "../components/Ui/Loader/Loader";
import UserList from "../components/UsersComp/UserList"
import { AuthContext } from "../context";
import { useObserver } from "../hooks/useObserver";

const Users = () => {
  const [users, setUsers] = useState([])
  const [filter, setFilter] = useState({ sort: '', query: '' })
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(1)
  const limit = 10

  const { token } = useContext(AuthContext)

  const lastPageEl = useRef()

  const [fetchUsers, isUsersLoading, userError] = useFetching(async (limit, page) => {
    const response = await UserService.getAll(token, limit, page);
    setUsers(() => {
      const responseUsers = response.data
      return [...users, ...responseUsers]
    })
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))
  })

  useEffect(() => {
    fetchUsers(limit, page)
  }, [page])

  useObserver(lastPageEl, page < totalPages, isUsersLoading, () => {
    setPage(page + 1)
  })

  const createUser = async (user) => {
    const newUser = await UserService.createUser(user, token)
    setUsers([...users, newUser])
    setModal(false)
  }

  const removeUser = async (user) => {
    await UserService.deleteUser(user.id, token)
    setUsers(users.filter(u => u.id !== user.id))
  }

  const changePage = (p) => {
    setPage(p)
  }

  const sortedAndSearchedUsers = useUsers(users, filter.sort, filter.query);

  return (
    <div className="App">
      <MyButton style={{ marginTop: 5 }} onClick={() => setModal(true)}>Створити користувача</MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <UserForm create={createUser} />
      </MyModal>
      <hr style={{ margin: '15px 0' }} />
      <UserFilter filter={filter} setFilter={setFilter} />
      {userError && <h1 style={{ fontSize: 50, textAlign: 'center', margin: '15px 0 15px 0' }} >Сталася помилка: {userError}</h1>}
      <UserList remove={removeUser} users={sortedAndSearchedUsers} title='Список користувачів' />
      <div ref={lastPageEl} style={{ height: 10, visibility: 'hidden' }}></div>
      {isUsersLoading && <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}><Loader /></div>}
    </div >
  );
}

export default Users;