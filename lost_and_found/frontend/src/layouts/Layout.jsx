import { useState } from "react";
import { createPost, getPostById } from "../services/api"
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Card from "../components/Card";

export default function Layout({ setPosts }) {
  const [showPost, setShowPost] = useState(false);

  const handlePost = async (formData) => {
    const newPost = await createPost(formData);
    if (newPost) {
      const response = await getPostById(newPost.postId)
      if (!response) return;
      setPosts(prev => [response, ...prev]);
      setShowPost(false);
    }
  };

  return (
    <>
      <Navbar onPostClick={() => setShowPost(true)}/>
      {showPost && <Card onClose={() => setShowPost(false)} onReport={handlePost} />}
      <Outlet></Outlet>
    </>
  )
}