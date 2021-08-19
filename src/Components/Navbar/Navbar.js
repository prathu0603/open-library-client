import React from "react";
import { NavLink } from "react-router-dom";
import "./style.css";
import lib from "../Assets/lib.png";

const Navbar = () => {
  return (
    <>
      <nav className="main-nav">
        <div>
          <img className="logo" src={lib} />
        </div>

        <div>
          <ul className="menu-link">
            <li>
              <NavLink to="/owner">Create A Book</NavLink>
            </li>
            <li>
              <NavLink to="/">Home Page</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
