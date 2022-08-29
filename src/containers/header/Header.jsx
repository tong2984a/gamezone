import React from 'react';
import people from '../../assets/people.png';
import gamezone from '../../assets/gamezone.png';
import './header.css';

const Header = () => (
  <div className="gpt3__header section__padding" id="home">
    <div className="gpt3__header-content">
      <h1 className="gradient__text">Game Zone</h1>
      <p>Platform for free games</p>
      <caption>Sign up for our newsletter!</caption>
      <div className="gpt3__header-content__input">
        <input type="email" placeholder="Your Email Address" />
        <button type="button">Get Started</button>
      </div>

      <div className="gpt3__header-content__people">
        <img src={people} />
        <p>1,600 people requested access a visit in last 24 hours</p>
      </div>
    </div>

    <div className="gpt3__header-image">
      <img src={gamezone} />
    </div>
  </div>
);

export default Header;
