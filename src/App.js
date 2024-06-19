import React, { useEffect, useState } from "react";
import './styles/App.css'
import { BrowserRouter } from 'react-router-dom';
import Navbar from "./components/Ui/Navbar/Navbar";
import AppRouter from "./components/AppRouter";
import { AuthContext } from "./context";
import PostService from "./API/PostService";

function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [token, setToken] = useState('')

  useEffect(() => {
    async function verifyToken() {
      if (localStorage.getItem('access_token')) {
        try {
          const storageToken = JSON.parse(localStorage.getItem('access_token'))
          await PostService.getById(1, storageToken)
          setIsAuth(true)
          setToken(storageToken)
        } catch (e) {
          console.log(e);
          localStorage.removeItem('access_token')
        }
      }
    }
    verifyToken()
    setIsLoading(false)
  }, [])

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem('currentPath', window.location.pathname);
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
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>

  );
}

export default App;
