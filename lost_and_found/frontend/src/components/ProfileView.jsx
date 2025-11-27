import CardPost from "../components/CardPost";

export default function ProfileView({ user, posts, currTab, setCurrTab }) {
  return (
    <>
            <div className="profileWrapper">
              <div className="profileCard">
                <div className="contactInfo">
                  <div className="rightContactInfo">
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                  </div>
                  <div className="tempForImage"></div>
                </div>
                <div className="lowerCard">
                  <button className="editProfileBtn">Edit profile</button>
                  <div className="colWrapper">
                    <div className="colBtns">
                      <button className={currTab === "posts" ? "currTab" : "" }
                      onClick={() => setCurrTab("posts")}>Posts</button>
                      <button className={currTab === "replies" ? "replies" : "" }
                      onClick={() => setCurrTab("replies")}>Replies</button>
                      <button className={currTab === "temp" ? "temp" : "" }
                      onClick={() => setCurrTab("temp")}>IDK</button>
                    </div>
                  </div>
                </div>
                <div className="postsWrapper">
                {currTab === "posts" && (
                  <>
                  {posts.length === 0 ? (
                    <p>Report a Lost/Found item</p>
                  ) : (
                    posts.map((post) => (
                      <CardPost key={post._id} post={post} viewMode="column"/>
                    ))
                  )}
                  </>
                )}
                {currTab === "replies" && (
                  <p>Replies</p>
                )}
                {currTab === "temp" && (
                  <p>temp</p>
                )}
              </div>
              </div>
            </div>
        </>
  );
}