import MyButton from "../components/Ui/button/MyButton";
import MyInput from "../components/Ui/input/MyInput";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context";
import LoginService from "../API/LoginService";
import { getFormData } from "../utils/formData";
import axios from "axios";

const Login = (props) => {
  const { setIsAuth, setToken } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [loginError, setLoginError] = useState(false)
  const [url, setUrl] = useState('')

  const login = async (e) => {
    e.preventDefault();
    try {
      if (credentials.username || credentials.password) {
        const formDataCredentials = getFormData(credentials)
        const loginResponse = await LoginService.login(formDataCredentials)
        const access_token = loginResponse.data
        if (access_token) {
          setToken(access_token)
          localStorage.setItem('access_token', JSON.stringify(access_token))
          setIsAuth(true)
          setCredentials({ username: '', password: '' })
        }
      }
    } catch {
      console.log('Invalid credentials');
      setLoginError(true)
      setCredentials({ username: '', password: '' })
    }
  }


  useEffect(() => {
    async function getUrl() {
      setUrl(await LoginService.loginGoogle())
    }
    getUrl()
  }, [])


  useEffect(() => {
    const fetchAccessToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (code) {
        try {
          const userInfo = await LoginService.getGoogleInfo(code)
          console.log(userInfo)
          if (userInfo) {
            setIsAuth(true)
          }
        } catch (error) {
          console.error('Error fetching access token:', error);
        }
      }
    };

    fetchAccessToken();
  }, []);

  return (
    <div style={{ width: 400 }}>
      <h1 style={{ fontSize: 30, fontWeight: 'bold' }}>Вхід</h1>
      <form>
        <MyInput onChange={e => setCredentials({ ...credentials, username: e.target.value })} value={credentials.username} type="text" placeholder='Введіть логін' />
        <MyInput onChange={e => setCredentials({ ...credentials, password: e.target.value })} value={credentials.password} type="password" placeholder='Введіть пароль' />
        {loginError && <div style={{ color: 'red', fontSize: '16px', paddingBottom: 5 }}>Invalid credentials.Try again</div>}
        <MyButton onClick={(e) => login(e)}>Увійти</MyButton>
      </form>
      <a href={url} style={{ fontSize: 18, fontWeight: 'bold', display: 'flex', marginTop: '7px', alignItems: 'center', width: 120, justifyContent: 'space-between', }}>Login with <img style={{ display: 'block', width: 25, height: 25 }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/480px-Google_%22G%22_logo.svg.png" alt="Опис картинки" />
      </a>
    </div >
  );
}

export default Login;