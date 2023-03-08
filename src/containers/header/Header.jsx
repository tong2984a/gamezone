import React from 'react';
import { NavLink } from 'react-router-dom';
import ai from '../../assets/ai.png';
import './header.css';

const Header = () => (
  <div className="gpt3__header section__padding" id="home">
    <div className="gpt3__header-image">
      <NavLink to="/games" className="navlink">
        <button
          type="button"
          className="mainButton spacerBottom"
        >
          Join Game
        </button>
      </NavLink>
    </div>

    <div className="gpt3__header-image">
      <img src={ai} />
    </div>
  </div>
);

export default Header;
