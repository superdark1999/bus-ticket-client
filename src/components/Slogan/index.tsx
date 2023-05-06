import React from 'react';
import styled from 'styled-components';

const SloganStyle = styled.div`
  .sectionContainer {
    .titleDiv {
      text-align: center;
      small {
        letter-spacing: 0.8rem;
        text-transform: uppercase;
        font-size: 13px;
        color: hsl(0, 0%, 12%);
        line-height: 1.5rem;
      }
    }

    .infoDiv {
      margin-top: 2rem;
      gap: 1.5rem;

      .textDiv {
        gap: 1.5rem;

        .singleInfo {
          .number {
            background: hsl(225, 50%, 48%);
            padding: 5px 12px;
            width: 40px;
            border-radius: 3rem;
            text-align: center;
            font-size: 13px;
            font-weight: 700;
            color: hsl(0, 0%, 100%);
          }

          .colorOne {
            background: hsl(15, 74%, 70%);
          }

          .colorTwo {
            background: hsl(28, 100%, 82%);
          }
        }
      }

      .imgDiv {
        margin: auto;

        img {
          width: 100%;
          max-width: 420px;
        }
      }
    }
  }
`;

const Slogan = () => (
  <SloganStyle className="container section">
    <div className="sectionContainer">
      <div className="titleDiv">
        <small>travel support</small>
        <h2>Plane with confident</h2>
        <p>Find help with booking</p>
      </div>

      <div className="infoDiv grid">
        <div className="textDiv grid">
          <div className="singleInfo">
            <span className="number">01</span>
            <h4>Travel to Dubai</h4>
            <p>Find help with booking</p>
          </div>

          <div className="singleInfo">
            <span className="number colorOne">02</span>
            <h4>Travel to HongKong</h4>
            <p>Find help with booking</p>
          </div>

          <div className="singleInfo">
            <span className="number colorTwo">03</span>
            <h4>Travel to Vietnam</h4>
            <p>Find help with booking</p>
          </div>
        </div>

        <div className="imgDiv">
          <img src="/bus_driver.jpg" alt="" />
        </div>
      </div>
    </div>
  </SloganStyle>
);

export default Slogan;
