import React, { useState } from "react";
import MyInput from '../Ui/input/MyInput'
import MyButton from '../Ui/button/MyButton'
import { validateEmail } from "../../utils/emailValidate";

const UserForm = ({ register, style }) => {
  const [user, setUser] = useState({ first_name: '', last_name: '', password: '', email: '' })
  const [error, setError] = useState(false)

  const registerUser = async (e) => {
    e.preventDefault()
    if (user.first_name == false || user.last_name == false || user.password == false || user.email == false) {
      return 0
    }
    if (!validateEmail(user.email)) {
      return 0
    }
    const result = await register(user)
    if (result.status == 409) {
      setError(true)
    }
    setUser({ first_name: '', last_name: '', password: '', email: '' })
  }

  return (
    <form >
      <MyInput onChange={e => setUser({ ...user, first_name: e.target.value })} value={user.first_name} type="text" placeholder="Ім'я" />
      <MyInput onChange={e => setUser({ ...user, last_name: e.target.value })} value={user.last_name} type="text" placeholder="Прізвище" />
      <MyInput onChange={e => setUser({ ...user, email: e.target.value })} value={user.email} type="text" placeholder="Пошта" />
      <MyInput onChange={e => setUser({ ...user, password: e.target.value })} value={user.password} type="password" placeholder="Пароль" />
      {error && <div className="error">User with this email already exists</div>}
      <MyButton style={style} onClick={registerUser} >Зареєструватись</MyButton>
    </form>
  )
}

export default UserForm;