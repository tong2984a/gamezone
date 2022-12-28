import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Colors, Devices } from '../components/Theme';
import Page from '../components/styled/Page.styled';
import Home from '../components/tasks/TaskManager';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    background-color: ${Colors.Background};
    font-family: "Poppins", sans-serif;
  }

  p,a,h1,h2,h3,h5,h6,div,span{
    /* color:${Colors.White}; */
    color: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    transition:all .3s;
  }

  /* width */
  body::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  body::-webkit-scrollbar-track {
    background: #ffffff;
  }

  /* Handle */
  body::-webkit-scrollbar-thumb {
    background: #212121;
    border-radius: 20px;
  }

  /* Handle on hover */
  body::-webkit-scrollbar-thumb:hover {
    background: rgb(43, 43, 43);
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
`;

const HomeEl = styled.article`
  color: ${Colors.White};
`;

const TopCollectiblesEl = styled.article`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  padding: 1rem;

  @media ${Devices.Tablet} {
    padding: 1rem 3rem;
  }
  @media ${Devices.Laptop} {
    padding: 1rem 5%;
  }
  @media ${Devices.LaptopL} {
    padding: 1rem 10%;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 500;
`;
const TopSection = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const Sort = styled.div`
  border-radius: 30px;
  border: 1px solid ${Colors.Primary};
  padding: 0.4rem 1rem;
  cursor: pointer;
`;
const Date = styled.div`
  background: linear-gradient(
    to right,
    ${Colors.Gradients.PrimaryToSec[0]},
    ${Colors.Gradients.PrimaryToSec[1]}
  );
  border-radius: 30px;
  padding: 0.4rem 2.5rem;
`;
const ShowMore = styled.button`
  margin-top: 1rem;
  cursor: pointer;
  border: 1px solid ${Colors.Primary};
  padding: 1rem 2rem;
  color: ${Colors.Primary};
  background-color: transparent;
  border-radius: 5px;
  font-size: 1rem;
`;

export default function TopCollectibles() {
  return (
    <>
      <GlobalStyle />
      <Main>
        <Page>
          <HomeEl>
            <TopCollectiblesEl>
              <Title>Top Games</Title>
              <TopSection>
                <Sort>Payout Volume</Sort>
                <Date>Today</Date>
              </TopSection>
              <Home />
              <ShowMore>show more</ShowMore>
            </TopCollectiblesEl>
          </HomeEl>
        </Page>
      </Main>
    </>
  );
}
