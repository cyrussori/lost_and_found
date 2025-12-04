import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Welcome from "./components/Welcome";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Browse from "./pages/Browse";
import Search from "./pages/Search";
import UserPost from "./pages/UserPost";
import Layout from "./layouts/Layout";
import EditProfile from "./pages/EditProfile";
import { getPosts, fetchMe, markResolved } from "./services/api";

export default function AppRoutes() {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [cardOpen, setCardOpen] = useState(false);

  const demoPosts = [
    {
      id: 1,
      _id: 1,
      user_id: 123,
      user_name: "Alice",
      title: "Lost Wallet",
      description: "Black wallet",
      category: "Wallet",
      post_type: "Lost",
      address: "123 Main St",
      status: "Lost",
      file_path: null,
    },
  ];

  useEffect(() => {
    getPosts()
      .then((data) => setPosts(data))
      .catch(() => setPosts(demoPosts));
  }, []);

  useEffect(() => {
    async function loadUser() {
      try {
        const user = await fetchMe();
        setCurrentUser(user);
        console.log("Current user set");
      } catch {
        setCurrentUser(null);
      }
    }

    loadUser();
  }, []);

  const handlePostClick = () => {
    if (!currentUser) {
      setCardOpen(true);
      return;
    }
    setCardOpen(true);
  };

  const handleResolved = async (postId) => {
    if (currentUser) {
      await markResolved(postId);
      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, status: "Resolved" } : p))
      );
    } else {
      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, status: "Resolved" } : p))
      );
    }
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
      <Route 
        path="/edit-profile" 
        element={<EditProfile currentUser={currentUser} />} 
      />

      <Route
        path="/login"
        element={<Login setCurrentUser={setCurrentUser} />}
      />
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
          element={
            <Browse
              posts={posts}
              setPosts={setPosts}
              onResolved={handleResolved}
              currentUser={currentUser}
            />
          }
        />
        <Route
          path="/search"
          element={
            <Search
              posts={posts}
              setAllPosts={setPosts}
              currentUser={currentUser}
            />
          }
        />
        <Route
          path="/profile/:id"
          element={<Profile posts={posts} setPosts={setPosts} />}
        />
        <Route
          path="/posts/:postId"
          element={<UserPost currentUser={currentUser} />}
        />
        
      </Route>

      {/* demo */}
      <Route
        path="/demo-browse"
        element={
          <div style={{ padding: 20 }}>
            <h2>Browse Demo</h2>
            <Browse
              posts={demoPosts}
              setPosts={(newPosts) => console.log("Updated posts:", newPosts)}
              onResolved={(postId) => {
                console.log("Resolved post:", postId);
              }}
            />
          </div>
        }  
      />
    </Routes>
  );
}
