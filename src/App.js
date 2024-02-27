import React from "react";
import './styles/App.css'
import Posts from "./pages/Posts";
import About from "./pages/About";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from "./components/Ui/Navbar/Navbar";

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
