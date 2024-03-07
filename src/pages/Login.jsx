import MyButton from "../components/Ui/button/MyButton";
import MyInput from "../components/Ui/input/MyInput";
import { useContext } from "react";
import { AuthContext } from "../context";

const Login = (props) => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const login = e => {
    e.preventDefault();
    setIsAuth(true)
  }
  return (
    <div>
      <h1 style={{ fontSize: 30, fontWeight: 'bold' }}>Вхід</h1>
      <form onSubmit={login}>
        <MyInput type="text" placeholder='Введіть логін' />
        <MyInput type="password" placeholder='Введіть пароль' />
        <MyButton>Увійти</MyButton>
      </form>
    </div>
  );
}

export default Login;