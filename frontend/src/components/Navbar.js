import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/students">Students</Link>
        </li>
        <li>
          <Link to="/add-students">Create Students</Link>
        </li>
        <li>
          <Link to="/teachers">Teachers</Link>
        </li>
        <li>
          <Link to="/add-teachers">Create Teachers</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;