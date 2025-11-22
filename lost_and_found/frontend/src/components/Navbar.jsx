import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as HomeIcon } from '../images/home.svg'
import { ReactComponent as SearchIcon } from '../images/search.svg'
import { ReactComponent as PostIcon } from '../images/post.svg'
import { ReactComponent as ProfileIcon } from '../images/profile.svg'

export default function Navbar({ onPostClick }) {
  const location = useLocation();
// TODO: Post card pop-up, search page => Lift state up.
  const navLinks = [
    { path: '/browse', Icon: HomeIcon },
    { path: '/search', Icon: SearchIcon },
    { path: '/post', Icon: PostIcon },
    { path: '/profile', Icon: ProfileIcon },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-header">
        <Link to="/" className="brand"><h2>Lost & Found</h2></Link>
      </div>
      <ul className="navbar-links">
        {navLinks.map(({ path, Icon }) => ( 
          <li key={path}> 
            { path === "/post" ? (
              <div onClick={onPostClick} className="icon-wrapper">
                <Icon className="icon-svg" width={40} height={40}/>
              </div>
            ) : (
            <Link 
              to={path}
              className={location.pathname === path ? 'active' : ''}
            >
              <Icon className="icon-svg" width={40} height={40} /> 
            </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}