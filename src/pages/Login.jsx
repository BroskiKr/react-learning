import MyButton from "../components/Ui/button/MyButton";
import MyInput from "../components/Ui/input/MyInput";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context";
import LoginService from "../API/LoginService";
import { getFormData } from "../utils/formData";
import { Link } from "react-router-dom";
import '../styles/Auth.css';

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
      setUrl(await LoginService.getGoogleLoginUrl())
    }
    getUrl()
  }, [])


  useEffect(() => {
    const fetchAccessToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (code) {
        try {
          const token = await LoginService.googleLogin(code)
          if (token) {
            setToken(token)
            localStorage.setItem('access_token', JSON.stringify(token))
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
    <div className="container">
      <div className="content">
        <div className="routes">
          <span className="route_active">Вхід</span>
          <span> / </span>
          <Link to='/register'>Реєстрація</Link>
        </div>
        <form>
          <label htmlFor="username">Логін</label>
          <MyInput id="username" onChange={e => setCredentials({ ...credentials, username: e.target.value })} value={credentials.username} type="text" placeholder='Введіть логін' />
          <label htmlFor="pass">Пароль</label>
          <MyInput id="pass" onChange={e => setCredentials({ ...credentials, password: e.target.value })} value={credentials.password} type="password" placeholder='Введіть пароль' />
          {loginError && <div className="error">Invalid credentials.Try again</div>}
          <MyButton style={{ width: '100%', margin: '3px 0 11px 0', padding: '10px 0' }} onClick={(e) => login(e)}>Увійти</MyButton>
        </form>
        <div>
          <div className="divider"><span>або</span></div>
          <a href={url} className="social_link">
            <img style={{ display: 'block', width: 20, height: 20, marginRight: 5 }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/480px-Google_%22G%22_logo.svg.png" alt="Опис картинки" />
            <span>Google</span>
          </a>
        </div>
      </div >
    </div>
  );
}

export default Login;