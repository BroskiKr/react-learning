import React, { useEffect, useState } from "react";
import './styles/App.css'
import { BrowserRouter } from 'react-router-dom';
import Navbar from "./components/Ui/Navbar/Navbar";
import AppRouter from "./components/AppRouter";
import { AuthContext } from "./context";

function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [token, setToken] = useState('')

  useEffect(() => {
    setIsLoading(false)
  }, [])

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
