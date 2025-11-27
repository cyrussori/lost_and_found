import { API_BASE } from "../services/api";
import ProfileView from "../components/ProfileView";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ViewedProfile() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [currTab, setCurrTab] = useState("posts");
  const { id } = useParams();

  useEffect(() => {
  async function fetchUser() {
      try {
        const res = await fetch(`${API_BASE}/users/${id}`, {
          credentials: "include",       // required for session cookies
        });

        if (!res.ok) {
          setUser(null);
        } else {
          const data = await res.json();
          setUser(data.user);           // backend should send { user: {...} }
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [id]); 

  useEffect(() => {
    if (!user) return;
    if (currTab !== "posts") return;
    async function fetchUserPosts() {
        try {
          const res = await fetch(`${API_BASE}/posts/me`, {
            method: "GET",
            credentials: "include",       // required for session cookies
          });

          if (!res.ok) {
            console.error("Failed loading posts", res.status);
            return;
          } else {
            const data = await res.json();
            setPosts(data);           
          }
        } catch (err) {
          console.error("Error fetching user posts:", err);
        }
      }
    fetchUserPosts();
  }, [user, currTab, id]); 
  return (
      <>
        <div className="headerWrapper">
          <h4>Profile</h4>
        </div>
        {loading && <p>Loading...</p>}
        {user && (
          <ProfileView user={user} posts={posts} currTab={currTab} setCurrTab={setCurrTab}></ProfileView>
        )}
      </>
  );
}