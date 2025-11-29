import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Welcome from "./components/Welcome";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Browse from "./pages/Browse";
import Search from "./pages/Search";
import Layout from "./layouts/Layout";
import { getPosts, fetchMe } from "./services/api";

export default function AppRoutes() {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [cardOpen, setCardOpen] = useState(false);

  useEffect(() => {
    getPosts().then((data) => setPosts(data));
  }, []);

  // Load current user from session
  useEffect(() => {
    async function loadUser() {
      const user = await fetchMe();
      setCurrentUser(user);
      console.log("Current user set");
    }
  
    loadUser();
  }, []);

  const handlePostClick = () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    setCardOpen(true);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Welcome
            cardOpen={cardOpen}
            setCardOpen={setCardOpen}
            setPosts={setPosts}
            onPostClick={handlePostClick}
          />
        }
      />

      <Route path="/login" element={<Login setCurrentUser={setCurrentUser}/>} />
      <Route path="/signup" element={<Signup />} />

      <Route
        element={
          <Layout
            currentUser={currentUser}
            cardOpen={cardOpen}
            setCardOpen={setCardOpen}
            setPosts={setPosts}
            onPostClick={handlePostClick}
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
