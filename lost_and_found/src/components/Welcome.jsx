import { useState } from "react";
import "../css/main.css"
function CardPost({text}) {
  return (
    <div className="cardPost">
      <div className="cardStyle">
        <h4>Missing item</h4>
        <p>{text}</p>
        <img alt="Lost item img"></img>
      </div>
    </div>
  )
}
function Card({onClose, onReport}) {
  const [text, setText] = useState("");
  function handleReport() {
    onReport(text);
  }
  function handleSubmit(e) {
    e.preventDefault();
    handleReport();
  }
  return (
    <div className="card">
      <div className="cardStyle">
        <h4>Report your missing item</h4>
        <p>enter some details...</p>
        <form onSubmit={handleSubmit}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit">Report</button>
        </form>
        
        <button onClick={onClose}>Close</button>
      </div>

    </div>
  );
}

export default function Welcome() {
  //useState([]) for an array of posts.
  const [feed, setFeed] = useState([]);
  const [card, setCard] = useState(false);
  //Handle post mechanism
  function handlePost() {
    //set state setter function setCard to true
    setCard(true);
  }

  function handleReport(text) {
    const item = { id: crypto.randomUUID?.() ?? String(Date.now()), text };
    setFeed((prev) => [item, ...prev]);
    setCard(false);
  }

  return (
    <>
    <div className="wrapper">
      <h1>LOGO</h1>

      <div className="linkBar">
        <button className="btnStyle"> Lost </button>
        <button className="btnStyle"> Found </button>
        <a href="../pages/Login.jsx">Login</a>
      </div>
    
    </div>
    <div className="laf">
      <div>
        <h1>Lost and Found</h1>
        <p>Some random text about the website. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Aenean nunc elit, malesuada ac lorem 
          non, eleifend vulputate sapien.</p>
      </div>
      <div>
        <div className="imagetemp">temp for img</div>
        <button className="btnStyle" onClick={handlePost}>Post</button>
      </div>
    </div>
    <div className="feed">
      {feed.map((item) => <CardPost key={item.id} text={item.text}/>)}
    </div>
    {card && <Card onClose={() => setCard(false)} onReport={handleReport}/>}
    </>
  )
}
