import React from 'react';
import styled from 'styled-components';

const HomeStyle = styled.div`
  padding-top: 10rem;
  text-align: center;
  gap: 2rem;
  flex-direction: column;

  .mainText {
    color: hsl(0, 0%, 12%);
    font-weight: 700;
    font-size: 15px;
    line-height: 2.5rem;
  }

  .homeImage {
    width: 100%;
    margin: 1rem auto 0;
    justify-content: center;
    align-items: center;
    position: relative;
    border-radius: 5rem;

    .videoDiv {
      width: 100%;
      .video {
        border-radius: 10rem;
      }
    }
    .bus {
      position: absolute;
      width: 100%;
      top: -10%;
    }
  }
`;

const Home = () => (
  <HomeStyle className="flex container">
    <div className="mainText">
      <h1>Create Ever-lasting Memories With Us</h1>
    </div>

    <div className="homeImage flex">
      <div className="videoDiv">
        <video src="/bus_video.mp4" autoPlay muted loop className="video">
          <track kind="" src="" label="" />
        </video>
      </div>

      {/* <img src="/bus.png" alt="" className="bus" width="100px" /> */}
    </div>
  </HomeStyle>
);

export default Home;
