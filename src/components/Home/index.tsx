import React, { useEffect } from 'react';
import styled from 'styled-components';

const HomeStyle = styled.div`
  padding-top: 5rem;
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

  @media screen and (min-width: 480px) {
    padding-top: 6rem;
  }

  @media screen and (min-width: 570px) {
    .mainText {
      width: 80%;
    }

    .homeImage {
      .video {
        border-radius: 15rem;
      }
    }
  }

  @media screen and (min-width: 680px) {
    .mainText {
      width: 80%;
    }

    .homeImage {
      .videoDiv {
        width: 80%;

        .video {
          height: 100%;
          width: 100%;
          border-radius: 15rem;
        }
      }
    }
  }

  @media screen and (min-width: 960px) {
    padding-top: 7rem;

    .mainText {
      width: 70%;
      padding-bottom: 1.5rem;
      font-size: 22px;
      line-height: 4rem;
    }
  }

  @media screen and (min-width: 1024px) {
    .mainText {
      width: 60%;
      font-size: 25px;
      line-height: 4rem;
    }

    .homeImage {
      .videoDiv {
        width: 90%;
        height: 300px;

        .video {
          height: 100%;
          width: 100%;
          object-fit: cover;
          border-radius: 15rem;
        }
      }
    }
  }

  @media screen and (min-width: 1440px) {
    .homeImage {
    }
  }
`;

const Home = () => {
  useEffect(() => {}, []);

  return (
    <HomeStyle className="flex container">
      <div className="mainText">
        <h1 data-aos="fade-up" data-aos-duration="2500">
          Create Ever-lasting Memories With <span style={{display: 'block', fontSize: '3rem'}}> -------- Bus Lines -------- </span>
        </h1>
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
};

export default Home;
