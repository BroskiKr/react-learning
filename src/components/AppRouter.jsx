import { Route, Routes, Navigate } from 'react-router-dom';
import { useEffect } from "react";
import { privateRoutes, publicRoutes } from "../router/routes";
import { useContext, useState } from 'react';
import { AuthContext } from '../context';
import Loader from './Ui/Loader/Loader';

const AppRouter = (props) => {
  const { isAuth, isLoading } = useContext(AuthContext);
  const [urlBeforeUnload, setUrlBeforeUnload] = useState('/')

  useEffect(() => {
    const savedPath = localStorage.getItem('currentPath');
    if (savedPath) {
      setUrlBeforeUnload(savedPath);
    }
  }, []);

  if (isLoading) {
    return <Loader />
  }
  return (
    isAuth
      ?
      <Routes >
        {privateRoutes.map((route) =>
          <Route key={route.path} path={route.path} element={route.component} />
        )}
        <Route path="/login" element={<Navigate to={urlBeforeUnload} replace />} />
        <Route path="/register" element={<Navigate to={urlBeforeUnload} replace />} />
      </Routes >
      :
      <Routes >
        {publicRoutes.map((route) =>
          <Route key={route.path} path={route.path} element={route.component} />
        )}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes >
  );
}

export default AppRouter;