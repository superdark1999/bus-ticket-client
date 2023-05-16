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


  @media screen and (min-width: 570px) {
    .sectionContainer {
      .infoDiv {
        .textDiv {
          margin-top: 2rem;
          grid-template-columns: repeat(2, 1fr);
        }
      }
    }
  }

  @media screen and (min-width: 768px) {
    .sectionContainer {
      .infoDiv {
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
        margin-top: 5rem;

        .textDiv {
          margin-top: 0rem;
          grid-template-columns: repeat(1, 1fr);
        }
      }
    }
  }

  @media screen and (min-width: 1332px) {
    .sectionContainer {
      .infoDiv {
        gap: 1rem;

        .textDiv {
          .singleInfo {
            p {
              max-width: 500px;
            }
          }
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
        <h2>Travel with confident</h2>
        <p>Find help with booking</p>
      </div>

      <div className="infoDiv grid">
        <div className="textDiv grid">
          <div className="singleInfo">
            <span className="number">01</span>
            <h4>Hơn 20 triệu lượt khách</h4>
            <p>Bus Line phục vụ hơn 20 triệu lượt khách/bình quân 1 năm trên toàn quốc</p>
          </div>

          <div className="singleInfo">
            <span className="number colorOne">02</span>
            <h4>Hơn 250 phòng vé, phòng hàng</h4>
            <p>Bus Line có hơn 250 phòng vé, trạm trung chuyển, bến xe,... trên toàn hệ thống</p>
          </div>

          <div className="singleInfo">
            <span className="number colorTwo">03</span>
            <h4>Hơn 1600 chuyến mỗi ngày</h4>
            <p>Bus Line phục vụ hơn 1600 chuyến xe đường dài và liên tỉnh mỗi ngày</p>
          </div>
        </div>

        <div className="imgDiv">
          <img src="/hello.jpg" alt="" />
        </div>
      </div>
    </div>
  </SloganStyle>
);

export default Slogan;
