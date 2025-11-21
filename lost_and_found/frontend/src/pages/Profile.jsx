import "../css/profile.css";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
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

  useEffect(() => {
    axios.get("/api/users/me").then((res) => {
      setUser(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Navbar />
      {loading && <p>Loading...</p>}
      {user && (
        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      )}
    </>
  );
}
