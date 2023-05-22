import React from 'react';
import styled from 'styled-components';

import Home from '../../components/Home';
import Search from '../../components/Search';
import Slogan from '../../components/Slogan';
// import CarouselImage from '../../components/CarouselImage';


const MainDefaultStyle = styled.div`
  a {
    text-decoration: none;
  }

  li {
    list-style: none;
    cursor: pointer;
  }

  .section {
    padding: 4rem 0 2rem;
  }

  .container {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .icon {
    font-size: 1.3rem;
    cursor: pointer;
  }

  .flex {
    display: flex;
    align-items: center;
  }

  .grid {
    display: grid;
    align-items: center;
  }

  .none {
    display: none;
  }

  .btn {
    padding: .7rem 1.5rem;
    background: hsl(225, 50%, 48%);
    border: none;
    outline: none;
    border-radius: 3rem;
    cursor: pointer;
    color: hsl(0,0%, 100%);

    a {
      color: hsl(0,0%, 100%);
      font-weight: 500;
    }

    &:hover {
      background: hsl(225, 56%, 59%)
    }
  }

  img, video {
    width: 100%;
    height: auto;
  }

  input {
    font-size: 100%;
    color: rgb(145,145,145);
  }

  p {
    font-size: 13px;
    color: rgb(145,145,145);
    line-height: 22px;
  }

  h4 {
    padding: 1rem 0;
    font-weight: 700;
    color: hsl(0,0%, 12%);
  }

  h2 {
    font-size: 25px;
    padding: 1rem 0;
    color: hsl(0,0%, 12%);
  }

  @media screen and (min-width: 1024px) {
    p {
      font-size: 15px;
      line-height: 25px;
    }
  
    h4 {
      font-size: 20px;
    }
  
    h2 {
      font-size: 27px;
    }

    .section {
      padding: 6rem 0 4rem;
    }
  
    .container {
      width: 75%;
      margin: auto;
    }
  }

  ::selection {
    background: hsl(225, 50%, 48%);
    color: hsl(0, 0%, 100%);
  }

  ::webkit-scrollbar {
    width: 10px;
    background: hsl(0, 0%, 96%);
  }

  ::webkit-scrollbar-thumb {
    background: hsl(225, 50%, 48%);
    border-radius: 10px
  }
`

const HomePage = () => (
  <MainDefaultStyle>
    
    <Home/>
    <Search/>
    <Slogan/>
    {/* <CarouselImage/> */}
    
  </MainDefaultStyle>
);

export default HomePage;
