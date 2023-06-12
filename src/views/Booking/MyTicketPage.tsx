import React from 'react';
import styled from 'styled-components';

import { HiOutlineLocationMarker } from 'react-icons/hi';

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
    padding: 0.7rem 1.5rem;
    background: hsl(225, 50%, 48%);
    border: none;
    outline: none;
    border-radius: 3rem;
    cursor: pointer;
    color: hsl(0, 0%, 100%);

    a {
      color: hsl(0, 0%, 100%);
      font-weight: 500;
    }

    &:hover {
      background: hsl(225, 56%, 59%);
    }
  }

  img,
  video {
    width: 100%;
    height: auto;
  }

  input {
    font-size: 100%;
    color: rgb(145, 145, 145);
  }

  p {
    font-size: 13px;
    color: rgb(145, 145, 145);
    line-height: 22px;
  }

  h4 {
    padding: 1rem 0;
    font-weight: 700;
    color: hsl(0, 0%, 12%);
  }

  h2 {
    font-size: 25px;
    padding: 1rem 0;
    color: hsl(0, 0%, 12%);
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
    border-radius: 10px;
  }

  @media screen and (min-width: 1240px) {
    .container {
      width: 80% !important;
      margin: auto !important;
    }

    .section {
      padding: 6rem 0 4rem;
    }
  }

  @media screen and (min-width: 2560px) {
    body {
      zoom: 1.7;
    }
  }
`;

const MyTicketStyle = styled.section`
  width: 100%;

  .secTitle {
    .title {
      position: relative;
      width: max-content;
      color: hsl(240, 1%, 48%);
      margin: 1rem 0;
      z-index: 2;
      font-size: 2rem;
    }
  }

  .secContent {
    justify-content: center;
    gap: 1.5rem;

    .singleDestination {
      height: 100%;
      display: grid;
      row-gap: 10px;
      /* padding: 1rem; */
      border-radius: 10px;
      align-items: center;
      background: rgb(225, 225, 235);
      box-shadow: 0px 2px 4px rgba(140, 140, 141, 0.549);
      overflow: hidden;

      &:hover {
        background: rgb(255, 255, 255);
        box-shadow: 1px 4px 4px rgba(85, 85, 114, 0.549);
        transition: 0.3 ease;
      }

      .imageDiv {
        height: 180px;
        width: 100%;
        overflow: hidden;

        img {
          height: 100%;
          width: 100%;
          object-fit: cover;
          transition: 2s ease;

          &:hover {
            /* transform: scale(1.3); */
          }
        }
      }

      .cardInfo {
        padding: 1rem;

        .destTitle {
          color: hsl(0, 0%, 12%);
          font-size: 1.25rem;
        }

        .continent {
          gap: 0.5rem;

          .icon {
            color: hsl(240, 1%, 48%);
            font-size: 18px;
          }

          .name {
            color: hsl(0, 0%, 12%);
            font-weight: 500;
            font-size: 14px;
          }
        }

        .fees {
          width: 100%;
          justify-content: space-between;
          padding: 1rem;
          margin: 1rem 0;
          border-top: 1.5px solid rgb(145, 145, 145);
          border-bottom: 1.5px solid rgb(145, 145, 145);

          .grade {
            color: hsl(0, 0%, 12%);
            max-width: 300px;
            line-height: 20px;
            /* display: flex; */
            align-items: center;
            justify-content: center;

            p {
              color: hsl(0, 0%, 12%);
            }
          }

          .price {
            font-size: 2rem;
            color: hsl(0, 0%, 12%);
          }
        }
      }
    }
  }

  @media screen and (min-width: 500px) {
    .title {
      font-size: 1.5rem;

      &::after {
        width: 155px !important;
      }
    }

    .secContent {
      grid-template-columns: repeat(2, 1fr);

      .singleDestination {
        height: auto;
      }
    }
  }

  @media screen and (min-width: 840px) {
    .secContent {
      grid-template-columns: repeat(3, 1fr);

      /* .singleDestination {
        height: auto;
      } */
    }
  }
`;

const Data = [
  {
    id: 1,

    destTitle: 'Ha noi',
    location: 'TP.HCM',
    time: '10:00 13/06/2023',
    seatNumber: 'B15',
    fees: '$700',
  },
  {
    id: 2,

    destTitle: 'Dien bien',
    location: 'Son La',
    time: '8:00 15/06/2023',
    seatNumber: 'B9',
    fees: '$50',
  },
  {
    id: 3,
    destTitle: 'Phu quoc',
    location: 'Cat ba',
    time: '10:00 13/06/2023',
    seatNumber: 'B10, B12, B15',
    fees: '$700',
  },
  {
    id: 4,
    destTitle: 'Gia LAi',
    location: 'Pleiku',
    time: '10:00 13/06/2023',
    seatNumber: 'B10, B12, B15',
    fees: '$700',
  },
  {
    id: 5,
    destTitle: 'Tuy Hoa',
    location: 'Phu Yen',
    time: '10:00 13/06/2023',
    seatNumber: 'B10, B12, B15',
    fees: '$700',
  },
  {
    id: 6,
    destTitle: 'Dien Khanh',
    location: 'Khanh Hoa',
    time: '10:00 13/06/2023',
    seatNumber: 'B10, B12, B15',
    fees: '$700',
  },
  {
    id: 7,
    destTitle: 'Kon tum',
    location: 'Dak Lak',
    time: '10:00 13/06/2023',
    seatNumber: 'B10, B12, B15',
    fees: '$700',
  },
  {
    id: 8,
    destTitle: 'Tan Tien',
    location: 'Ca mau',
    time: '10:00 13/06/2023',
    seatNumber: 'B10, B12, B15',
    fees: '$700',
  },
];

const Image = [
  {
    id: 1,
    imgSrc: 'https://znews-photo.zingcdn.me/w1920/Uploaded/lerl/2020_08_28/SAM1010_zing.jpg',
  },
  {
    id: 2,
    imgSrc: 'https://znews-photo.zingcdn.me/w1920/Uploaded/lerl/2020_08_28/dong_chau_zing_6.jpg',
  },
  {
    id: 3,
    imgSrc: 'https://znews-photo.zingcdn.me/w1920/Uploaded/lerl/2020_08_28/9059_zing.jpg',
  },
  {
    id: 4,
    imgSrc: 'https://znews-photo.zingcdn.me/w1920/Uploaded/lerl/2020_08_28/thi_nai_zing.jpg',
  },
  {
    id: 5,
    imgSrc: 'https://znews-photo.zingcdn.me/w1920/Uploaded/lerl/2020_08_28/Vung_Tau_zing_1_1.jpg',
  },
  {
    id: 6,
    imgSrc: 'https://znews-photo.zingcdn.me/w1920/Uploaded/lerl/2020_08_28/moc_chau_zing_4_.jpg',
  },
  {
    id: 7,
    imgSrc: 'https://znews-photo.zingcdn.me/w1920/Uploaded/lerl/2020_08_28/moc_chau_zing_1_.jpg',
  },
  {
    id: 8,
    imgSrc: 'https://znews-photo.zingcdn.me/w1920/Uploaded/lerl/2020_08_28/ninh_binh_zing_3_.jpg',
  },
  {
    id: 9,
    imgSrc: 'https://znews-photo.zingcdn.me/w1920/Uploaded/lerl/2020_08_28/DJI_0100_zing.jpg',
  },
  {
    id: 10,
    imgSrc: 'https://znews-photo.zingcdn.me/w1920/Uploaded/lerl/2020_08_28/ninh_binh_zing_3_.jpg',
  },
  {
    id: 11,
    imgSrc: 'https://hanoiairporthotels.vn/media/1587/thanh-pho-vinh-phuc.png',
  },
  {
    id: 12,
    imgSrc: 'https://hanoiairporthotels.vn/media/1589/du-lich-hung-yen.png?width=683&height=460',
  },
  {
    id: 13,
    imgSrc: 'https://hanoiairporthotels.vn/media/1615/du-lich-son-la.png',
  },
  {
    id: 14,
    imgSrc: 'https://hanoiairporthotels.vn/media/1616/du-lich-hoa-binh.png',
  },
  {
    id: 15,
    imgSrc: 'https://hanoiairporthotels.vn/media/1624/du-lich-bac-giang.png',
  },
  {
    id: 16,
    imgSrc: 'https://hanoiairporthotels.vn/media/1628/du-lich-nghe-an.png?width=663&height=394',
  },
  {
    id: 17,
    imgSrc: 'https://hanoiairporthotels.vn/media/1642/du-lich-binh-dinh.png?width=789&height=488',
  },
  {
    id: 18,
    imgSrc: 'https://hanoiairporthotels.vn/media/1728/du-lich-lam-dong.png?width=683&height=461',
  },
  {
    id: 19,
    imgSrc: 'https://hanoiairporthotels.vn/media/1729/du-lich-dak-nong.png?width=660&height=429',
  },
  {
    id: 20,
    imgSrc: 'https://hanoiairporthotels.vn/media/1732/du-lich-binh-phuoc.png',
  },
];

const MyTicketPage = () => (
  <MainDefaultStyle>
    <MyTicketStyle className="container section" style={{ paddingTop: '10rem' }}>
      <div className="secTitle">
        <h1 className="title">Vé của tôi</h1>
      </div>

      <div className="secContent grid">
        {Data.map(({ id, destTitle, location, time, seatNumber, fees }, index) => {
          const image = Image[index] ? Image[index].imgSrc : null;

          return (
            <div key={id} className="singleDestination">
              <div className="imageDiv">{image && <img src={image} alt={destTitle} />}</div>

              <div className="cardInfo">
                <h4 className="destTitle">Điểm đến: {destTitle}</h4>
                <span className="continent flex">
                  <HiOutlineLocationMarker className="icon" />
                  <span className="name">Xuất phát: {location}</span>
                </span>

                <div className="fees flex">
                  <div className="grade">
                    <p>Thời gian: {time}</p>
                    <p>Vị trí ghế: {seatNumber}</p>
                  </div>
                  <div className="price">
                    <h5>{fees}</h5>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </MyTicketStyle>
  </MainDefaultStyle>
);

export default MyTicketPage;
