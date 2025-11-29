import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Card from "../components/Card";
import { createPost, getPostById } from "../services/api";

export default function Layout({
  currentUser,
  cardOpen,
  setCardOpen,
  setPosts,
  onPostClick,
}) {
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
      <Navbar currentUser={currentUser} onPostClick={onPostClick} />

      {cardOpen && (
        <Card onClose={() => setCardOpen(false)} onReport={handlePost} />
      )}

      <Outlet />
    </>
  );
}
