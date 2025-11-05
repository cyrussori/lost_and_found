import "../css/profile.css";
import { Link } from "react-router-dom";

// TODO:  
// - User => set to fullname, email => set to email
//          * Bring info from login on navigation
// - Way to navigate to main page. 
export default function Login() {
  return (
    <>
      {/*Header*/}
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
            <button className="editProfileBtn">EDIT PROFILE</button>
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
}