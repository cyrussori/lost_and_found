import "../css/search.css";
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar';
import { ReactComponent as SearchIcon } from "../images/search.svg";

export default function Search() {
  return (
    <>
      <Navbar/>
      {/*Header*/}
      <div className="searchHWrapper">
        <div className="searchBar">
          <SearchIcon className="searchIcon"/>
          <input type="search" name="s" className="searchInput" placeholder="Search"></input>
        </div>
      </div>
      <div className="browseWrapper">
        <div className="browseCard">
        </div>
      </div>
    </>
  );
}