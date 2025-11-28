import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Card from "../components/Card";
import { createPost, getPostById } from "../services/api";

export default function Layout({ cardOpen, setCardOpen, setPosts }) {
  const handlePost = async (formData) => {
    const newPost = await createPost(formData);
    if (!newPost) return;

    const response = await getPostById(newPost.postId);
    if (!response) return;

    setPosts((prev) => [response, ...prev]);
    setCardOpen(false);
  };

  return (
    <>
      <Navbar onPostClick={() => setCardOpen(true)} />

      {cardOpen && (
        <Card onClose={() => setCardOpen(false)} onReport={handlePost} />
      )}

      <Outlet />
    </>
  );
}
