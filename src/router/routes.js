import PostIdPage from "../pages/PostIdPage";
import Home from "../pages/Home";
import Posts from "../pages/Posts";
import About from "../pages/About";
import Error from "../pages/Error";
import Login from "../pages/Login";
import Users from "../pages/Users";
import UserProfile from "../pages/UserProfile";
import Settings from "../pages/Settings";
import Register from "../pages/Register";


export const privateRoutes = [
  { path: '/', component: <Home /> },
  { path: '/profile', component: <UserProfile /> },
  { path: '/settings', component: <Settings /> },
  { path: '/posts', component: <Posts /> },
  { path: '/users', component: <Users /> },
  { path: '/about', component: <About /> },
  { path: '/posts/:id', component: <PostIdPage /> },
  { path: '*', component: <Error /> },
]

export const publicRoutes = [
  { path: '/login', component: <Login /> },
  { path: '/register', component: <Register /> },
]