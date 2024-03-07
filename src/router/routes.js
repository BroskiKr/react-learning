import PostIdPage from "../pages/PostIdPage";
import Home from "../pages/Home";
import Posts from "../pages/Posts";
import About from "../pages/About";
import Error from "../pages/Error";
import Login from "../pages/Login";

export const privateRoutes = [
  { path: '/', component: <Home /> },
  { path: '/posts', component: <Posts /> },
  { path: '/about', component: <About /> },
  { path: '/posts/:id', component: <PostIdPage /> },
  { path: '*', component: <Error /> },
]

export const publicRoutes = [
  { path: '/login', component: <Login /> },
]