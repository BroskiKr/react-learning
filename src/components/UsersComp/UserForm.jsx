import React, { useState } from "react";
import MyInput from '../Ui/input/MyInput'
import MyButton from '../Ui/button/MyButton'

const UserForm = ({ create }) => {
  const [user, setUser] = useState({ first_name: '', last_name: '' })

  const addNewUser = async (e) => {
    e.preventDefault()
    if (user.first_name == false || user.last_name == false) {
      return 0
    }
    create(user)
    setUser({ first_name: '', last_name: '' })
  }

  return (
    <form>
      <MyInput onChange={e => setUser({ ...user, first_name: e.target.value })} value={user.first_name} type="text" placeholder="Ім'я" />
      <MyInput onChange={e => setUser({ ...user, last_name: e.target.value })} value={user.last_name} type="text" placeholder="Прізвище" />
      <MyButton onClick={addNewUser} >Створити користувача</MyButton>
    </form>
  )
}

export default UserForm;