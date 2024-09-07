import React, { useEffect, useState } from "react";
import './styles/App.css'
import { BrowserRouter } from 'react-router-dom';
import Navbar from "./components/Ui/Navbar/Navbar";
import AppRouter from "./components/AppRouter";
import { AuthContext } from "./context";
import UserService from "./API/UserService";

function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [token, setToken] = useState('')

  useEffect(() => {
    async function verifyToken() {
      if (localStorage.getItem('access_token')) {
        try {
          const storageToken = JSON.parse(localStorage.getItem('access_token'))
          await UserService.getById(storageToken)
          setIsAuth(true)
          setToken(storageToken)
        } catch (e) {
          localStorage.removeItem('access_token')
        }
      }
    }
    verifyToken()
    setIsLoading(false)
    localStorage.removeItem('currentPath')
  }, [])

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (window.location.pathname != '/login' && window.location.pathname != '/register') {
        localStorage.setItem('currentPath', window.location.pathname);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth,
      isLoading,
      token,
      setToken
    }}>
      <BrowserRouter>
        {isAuth && <Navbar />}
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>

  );
}

export default App;
