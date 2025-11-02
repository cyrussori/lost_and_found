import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/main.css"

function CardPost({ post }) {
  return (
    <div className="cardPost">
      <div className="cardStyle">
        <h4>{post.title}</h4>
        <p><strong>{post.category}</strong></p>
        <p>{post.description}</p>
        <p><em>{post.address}</em></p>
        {post.contact && (
          <p><strong>Contact:</strong> {post.contact}</p>
        )}
        {post.image && (
          <img
            src={URL.createObjectURL(post.image)}
            alt="Lost item"
            style={{ width: "100%", borderRadius: "8px", marginTop: "10px" }}
          />
        )}
      </div>
    </div>
  );
}

function Card({ onClose, onReport }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [image, setImage] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const post = {
      id: crypto.randomUUID?.() ?? String(Date.now()),
      title,
      description,
      category,
      address,
      contact,
      image,
    };
    onReport(post);
    onClose();
  }

  return (
    <div className="card">
      <div className="cardStyle" style={{ width: "400px" }}>
        <h3>Report Item</h3>
        <form onSubmit={handleSubmit} className="formContainer">
          <label>Title</label>
          <input
            type="text"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Description</label>
          <textarea
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
          />

          <label>Category</label>
          <select
            value={category}
            required
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select category</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothes">Clothes</option>
            <option value="Bottle">Bottle</option>
            <option value="Keys">Keys</option>
            <option value="Bag">Bag</option>
            <option value="Wallet">Wallet</option>
            <option value="Other">Other</option>
          </select>

          <label>Address / Location</label>
          <input
            type="text"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          />

          <label>Contact Info</label>
          <input
            type="text"
            value={contact}
            required
            onChange={(e) => setContact(e.target.value)}
            placeholder="Phone number, email, etc."
          />

          <label>Picture (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
            <button type="submit" className="btnStyle">Report</button>
            <button
              type="button"
              className="btnCancel"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Welcome() {
  const [feed, setFeed] = useState([]);
  const [card, setCard] = useState(false);

  function handlePost() {
    setCard(true);
  }

  function handleReport(post) {
    setFeed((prev) => [post, ...prev]);
    setCard(false);
  }

  return (
    <>
      <div className="wrapper">
        <h1>LOGO</h1>
        <div className="linkBar">
          <button className="btnStyle"> Lost </button>
          <button className="btnStyle"> Found </button>
          <Link to="/login">Login</Link>
        </div>
      </div>

      <div className="laf">
        <div>
          <h1>Lost and Found</h1>
          <p>
            Some random text about the website. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Aenean nunc elit, malesuada ac lorem 
            non, eleifend vulputate sapien.
          </p>
        </div>
        <div>
          <div className="imagetemp">temp for img</div>
          <button className="btnStyle" onClick={handlePost}>Post</button>
        </div>
      </div>

      <div className="feed">
        {feed.map((item) => <CardPost key={item.id} post={item} />)}
      </div>

      {card && <Card onClose={() => setCard(false)} onReport={handleReport} />}
    </>
  );
}
