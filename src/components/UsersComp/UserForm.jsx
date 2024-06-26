import React, { useState } from "react";
import MyInput from '../Ui/input/MyInput'
import MyButton from '../Ui/button/MyButton'
import { validateEmail } from "../../utils/emailValidate";

const UserForm = ({ create }) => {
  const [user, setUser] = useState({ first_name: '', last_name: '', password: '', email: '' })

  const addNewUser = async (e) => {
    e.preventDefault()
    if (user.first_name == false || user.last_name == false || user.password == false || user.email == false) {
      return 0
    }
    if (!validateEmail(user.email)) {
      return 0
    }
    await create(user)
    setUser({ first_name: '', last_name: '', password: '' })
  }

  return (
    <form>
      <MyInput onChange={e => setUser({ ...user, first_name: e.target.value })} value={user.first_name} type="text" placeholder="Ім'я" />
      <MyInput onChange={e => setUser({ ...user, last_name: e.target.value })} value={user.last_name} type="text" placeholder="Прізвище" />
      <MyInput onChange={e => setUser({ ...user, email: e.target.value })} value={user.email} type="text" placeholder="Пошта" />
      <MyInput onChange={e => setUser({ ...user, password: e.target.value })} value={user.password} type="password" placeholder="Пароль" />
      <MyButton onClick={addNewUser} >Створити користувача</MyButton>
    </form>
  )
}

export default UserForm;