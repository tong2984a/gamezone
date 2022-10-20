import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #7c7c7c2e;
    font-family: "Poppins", sans-serif;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .icon {
    width: 2.5rem;
    height: 2.5rem;
    border: 0;
    cursor: pointer;
    margin: 8px;
    display: flex;
    color: #202020;
    font-size: 1rem;
    border-radius: 50%;
    align-items: center;
    text-decoration: none;
    justify-content: center;
    background-color: #ececec;
    box-shadow: 10px 10px 15px #c7c4c4, -10px -10px 15px #fff;
  }
  
  .icon:focus {
    box-shadow: inset 5px 5px 5px #c7c4c4, inset -5px -5px 5px #fff;
  }
  
  .fa-facebook {
    color: #1877f2;
  }
  
  .fa-whatsapp {
    color: #25d366;
  }
  
  .fa-instagram {
    color: #e1306c;
  }
  
  .fa-twitter {
    color: #1da1f2;
  }
  
  .action {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .InBtn {
    margin: 8px;
    padding: 12px 1.5rem;
    display: flex;
    border: none;
    font-weight: 500;
    cursor: pointer;
    border-radius: 8px;
    color: #202020;
    font-size: 1rem;
    align-items: center;
    text-decoration: none;
    justify-content: center;
    background-color: #ececec;
    box-shadow: 10px 10px 15px #c7c4c4, -10px -10px 15px #fff;
  }
  
  .InBtn:focus {
    box-shadow: inset 5px 5px 5px #c7c4c4, inset -5px -5px 5px #fff;
  }
`;

const Social = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  width: 18rem;
  overflow: hidden;
  border-radius: 8px;
  padding: 1rem 1rem;
  margin: 1rem 1rem;
  transition: box-shadow 0.6s;
  box-shadow: 10px 10px 15px #7c7c7c2e, -10px -10px 15px #fff;
`;

const Ring = styled.div`
  height: 150px;
  width: 150px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #bababa4f;
  margin-left: auto;
  margin-right: auto;
`;

const RingImage = styled.div`
  height: calc(100% - 25px);
  width: calc(100% - 25px);
  border-radius: 50%;
`;

const Personal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export default function CardUI() {
  return (
    <>
      <GlobalStyle />
      <Card>
        <Ring>
          <RingImage>
            <img src="https://4.bp.blogspot.com/-ud0aBLrlJeI/YkZVOfL22KI/AAAAAAAAAWM/QkXwC9qDpEEKEIGtwbgZpimdAV9UJo7VwCK4BGAYYCw/s113/template_0j.jpg" alt="" />
          </RingImage>
        </Ring>
        <div className="details">
          <Personal>
            <h2>InCoder</h2>
            <p>Designer & Developer</p>
          </Personal>
          <Social>
            <div className="icon">
              <i className="fab fa-facebook" />
            </div>
            <div className="icon">
              <i className="fab fa-whatsapp" />
            </div>
            <div className="icon">
              <i className="fab fa-instagram" />
            </div>
            <div className="icon">
              <i className="fab fa-twitter" />
            </div>
          </Social>
          <div className="action">
            <button type="button" className="InBtn">Message</button>
            <button type="button" className="InBtn">Subscribe</button>
          </div>
        </div>
      </Card>
    </>
  );
}
