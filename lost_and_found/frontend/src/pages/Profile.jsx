import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_BASE } from "../services/api";
import ProfileView from "../components/ProfileView";
import axios from "axios";

// TODO:
// - User => set to fullname, email => set to email
//          * Bring info from login on navigation
// - Way to navigate to main page.
/*function CardEditProfile() {
  return (
    <div className="cardEdit">
      <div className="cardEditStyle">
        
      </div>
    </div>
  );
}
export default function Profile() {
  return (
    <>
      <Navbar/>
      
      <div className="headerWrapper">
        <h4>Profile</h4>
      </div>
      <div className="profileWrapper">
      <div className="profileCard">
        <div className="contactInfo">
            <div className="rightContactInfo">
                <h2>USER</h2> 
                <p>USER@gmail.com</p>
            </div>
            <div className="tempForImage"></div>
        </div>
        <div className="lowerCard">
            <button className="editProfileBtn">Edit profile</button>
            <div className="colWrapper">
                <div className="colBtns">
                    <button>Posts</button>
                    <button>Replies</button>
                    <button>IDK</button>
                </div>
            </div>
        </div>
      </div>
      </div>

    </>
  );
}*/

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [currTab, setCurrTab] = useState("posts");
/*
  useEffect(() => {
    async function fetchUser() {
      const loggedUser = localStorage.getItem('user');
      if (loggedUser) {
        setUser(JSON.parse(loggedUser))
      } else {
        const res = await fetch(`${API_BASE}/users/${id}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const data = await res.json();
        setUser(data);
      }
    }
    fetchUser();
  }, [username])
*/
 useEffect(() => {
  async function fetchUser() {
      try {
        const res = await fetch("http://localhost:5050/api/me", {
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
  }, []); 

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
}, [user, currTab]); 
/*
  useEffect(() => {
    const fakeUser = { name: "Josie Bruin", email: "josieBruin@ucla.edu" };
    setTimeout(() => {
      setUser(fakeUser);
      setLoading(false);
    }, 500);
  }, []);
*/
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
