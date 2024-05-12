import MyButton from "../components/Ui/button/MyButton";
import MyInput from "../components/Ui/input/MyInput";
import { useContext, useState } from "react";
import { AuthContext } from "../context";
import LoginService from "../API/LoginService";
import { getFormData } from "../utils/formData";

const Login = (props) => {
  const { setIsAuth, setToken } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [loginError, setLoginError] = useState(false)



  const login = async (e) => {
    e.preventDefault();
    try {
      if (credentials.username || credentials.password) {
        const formDataCredentials = getFormData(credentials)
        const loginResponse = await LoginService.login(formDataCredentials)
        const access_token = loginResponse.data
        if (access_token) {
          setToken(access_token)
          setIsAuth(true)
          setCredentials({ username: '', password: '' })
        }
      }
    } catch {
      console.log('Invalid credentials');
      setLoginError(true)
      setCredentials({ username: '', password: '' })
    }
    // localStorage.setItem('auth', 'true')
  }

  return (
    <div style={{ width: 400 }}>
      <h1 style={{ fontSize: 30, fontWeight: 'bold' }}>Вхід</h1>
      <form>
        <MyInput onChange={e => setCredentials({ ...credentials, username: e.target.value })} value={credentials.username} type="text" placeholder='Введіть логін' />
        <MyInput onChange={e => setCredentials({ ...credentials, password: e.target.value })} value={credentials.password} type="password" placeholder='Введіть пароль' />
        {loginError && <div style={{ color: 'red', fontSize: '16px', paddingBottom: 5 }}>Invalid credentials.Try again</div>}
        <MyButton onClick={(e) => login(e)}>Увійти</MyButton>
      </form>
    </div>
  );
}

export default Login;