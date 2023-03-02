import React from 'react';
import './footer.css';
import possibilityImage from '../../assets/GreedIslandlogo.png';

const Footer = () => (
  <div className="gpt3__footer section__padding">
    <div className="gpt3__footer-heading">
      <img src={possibilityImage} alt="possibility" />
      <h1 className="gradient__text">PLAY BY YOUR OWN RULES</h1>
    </div>

    <div className="gpt3__footer-btn">
      <p>Join Game</p>
    </div>

    <div className="gpt3__footer-links">
      <div className="gpt3__footer-links_div">
        <h4>Links</h4>
        <p>Overons</p>
        <p>Social Media</p>
        <p>Counters</p>
        <p>Contact</p>
      </div>
      <div className="gpt3__footer-links_div">
        <h4>Company</h4>
        <p>Terms & Conditions </p>
        <p>Privacy Policy</p>
        <p>Contact</p>
      </div>
      <div className="gpt3__footer-links_div">
        <h4>Get in touch</h4>
        <p>Olympic City, Hong Kong</p>
        <p>852 2333 4555</p>
        <p>info@gamezone.net</p>
      </div>
    </div>

    <div className="gpt3__footer-copyright">
      <p>@2021 All rights reserved.</p>
    </div>
  </div>
);

export default Footer;
