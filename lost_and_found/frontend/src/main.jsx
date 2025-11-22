import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./css/main.css";
import "./css/navbar.css";
import "./css/browse.css";
import "./css/cardPost.css";
import "./css/login.css";
import "./css/profile.css";
import "./css/search.css";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)