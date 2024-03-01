import Posts from "../pages/Posts";
import About from "../pages/About";
import Error from "../pages/Error";
import { Route, Routes } from 'react-router-dom';
import PostIdPage from "../pages/PostIdPage";
import Home from "../pages/Home";


const AppRouter = (props) => {
  return (
    <Routes >
      <Route path="/about" element={<About />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/posts/:id" element={<PostIdPage />} />
      <Route path="" element={<Home />} />
      <Route path="*" element={<Error />} />
    </Routes >
  );
}

export default AppRouter;