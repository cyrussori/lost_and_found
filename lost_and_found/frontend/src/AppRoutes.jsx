import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Welcome from "./components/Welcome";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Browse from "./pages/Browse";
import Search from "./pages/Search";
import Layout from "./layouts/Layout";
import { getPosts } from "./services/api";

export default function AppRoutes() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [cardOpen, setCardOpen] = useState(false);

  useEffect(() => {
    getPosts().then((data) => setPosts(data));
  }, []);

  // ✅ 统一的 post 点击权限判断
  const handlePostClick = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/login");
      return;
    }
    setCardOpen(true);
  };

  const handleReport = () => {
    setCardOpen(false);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Welcome
            onPostClick={handlePostClick}
            cardOpen={cardOpen}
            setCardOpen={setCardOpen}
            onReport={handleReport}
          />
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        element={
          <Layout
            cardOpen={cardOpen}
            setCardOpen={setCardOpen}
            setPosts={setPosts}
          />
        }
      >
        <Route
          path="/browse"
          element={<Browse posts={posts} setPosts={setPosts} />}
        />
        <Route
          path="/search"
          element={<Search posts={posts} setAllPosts={setPosts} />}
        />
        <Route
          path="/profile/:id"
          element={<Profile posts={posts} setPosts={setPosts} />}
        />
      </Route>
    </Routes>
  );
}
