import React from "react";
import dark_mode from "./logos/brightness-and-contrast.png";
import searchlogo from "./logos/search.png";
import "../App.css";

const Navbar = () => {
  const togglenavbar = (event) => {
    const clickedItem = event.currentTarget;
    const listItems = document.querySelectorAll('.list_items');
    
    listItems.forEach(item => {
      if (item === clickedItem) {
        if (!item.classList.contains('activated')){
            item.classList.add('activated');
        }
      } else {
        if (item.classList.contains('activated')){
            item.classList.remove('activated');
        }
      }
    });
  }

  return (
    <nav className="navbar">
      <span className="dark_light">
        <img src={dark_mode} alt="dark_mode" width="100px" />
      </span>
      <ul className="nav_items">
        <li className="list_items activated" onClick={togglenavbar}>Overview</li>
        <li className="list_items" onClick={togglenavbar}>About</li>
      </ul>
      <div className="search">
        <input
          type="search"
          className="my_search"
          placeholder="Search Events"
        />
        <img className="search_icon" src={searchlogo} alt="search" width="40px" />
      </div>
    </nav>
  );
};

export default Navbar;
