import React, { useContext } from "react";
import UserService from "../API/UserService";
import '../styles/Auth.css'
import { Link } from "react-router-dom";
import LoginService from "../API/LoginService";
import UserForm from "../components/UsersComp/UserForm";
import { getFormData } from "../utils/formData";
import { AuthContext } from "../context";


const Register = (props) => {
  const { setIsAuth, setToken } = useContext(AuthContext);

  const login = async (userCredentials) => {
    try {
      if (userCredentials.username || userCredentials.password) {
        const formDataCredentials = getFormData(userCredentials)
        const loginResponse = await LoginService.login(formDataCredentials)
        const access_token = loginResponse.data
        if (access_token) {
          setToken(access_token)
          localStorage.setItem('access_token', JSON.stringify(access_token))
          setIsAuth(true)
        }
      }
    } catch {
      console.log('Invalid credentials');
    }
  }

  const registerUser = async (user) => {
    try {
      const response = await UserService.registerUser(user)
    } catch (error) {
      return error.response
    }
    const userCredentials = { username: user.last_name, password: user.password }
    await login(userCredentials)
  }

  return (
    <div className="container">
      <div className="content">
        <div className="routes">
          <Link to='/login'>Вхід</Link>
          <span> / </span>
          <span className="route_active">Реєстрація</span>
        </div>
        <UserForm register={registerUser} style={{ marginBottom: 8, width: '100%' }} />
      </div>
    </div >)
}

export default Register;