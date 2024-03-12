import { Route, Routes, Navigate } from 'react-router-dom';
import { privateRoutes, publicRoutes } from "../router/routes";
import { useContext } from 'react';
import { AuthContext } from '../context';
import Loader from './Ui/Loader/Loader';

const AppRouter = (props) => {
  const { isAuth, setIsAuth, isLoading } = useContext(AuthContext);

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
        <Route path="/login" element={<Navigate to="/posts" replace />} />
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