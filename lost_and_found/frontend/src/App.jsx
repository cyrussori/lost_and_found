import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Browse from "./pages/Browse";
import Search from "./pages/Search";
import Layout from "./layouts/Layout";
import { getPosts } from "./services/api";
import { useState, useEffect } from "react";
import ViewedProfile from "./pages/ViewedProfile";

export default function App() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getPosts().then(data => setPosts(data));
  },[]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<Layout setPosts={setPosts}/>}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id" element={<ViewedProfile />} />
          <Route path="/browse" element={<Browse posts={posts}/>} />
          <Route path="/search" element={<Search />} />
        </Route>
      </Routes>
    </Router>
  );
}
