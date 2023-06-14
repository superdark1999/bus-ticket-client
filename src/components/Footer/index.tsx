import React from 'react';
import styled from 'styled-components';

import { TiSocialFacebook } from 'react-icons/ti';
import { AiFillYoutube, AiOutlineTwitter } from 'react-icons/ai';
import { FaPinterestP } from 'react-icons/fa';

const Container = styled.div`
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
`;

const FooterStyle = styled.div`
  background: hsl(180, 17%, 95%);

  .sectionContainer {
    gap: 2.5rem;

    .gridOne {
      gap: 1rem;
      justify-content: center;
      margin: auto;

      .logoDiv {
        .logo {
          width: 20%;
        }
      }

      .socialIcon {
        margin-top: 1rem;
        gap: 1rem;

        .icon {
          height: 50px;
          width: 30px;
          border-radius: 10rem;
          border: 1px solid hsl(0, 0%, 83%);
          box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
          padding: 0.4rem;
          color: rgb(145, 145, 145);

          &:hover {
            background: hsl(225, 50%, 48%);
            transform: translateY(-7px);
            transition: 0.4s ease-in-out;
            border: 1px solid hsl(225, 50%, 48%);
            color: hsl(0, 0%, 100%);
          }
        }
      }
    }

    .footerLinks {
      display: grid;

      .linkTitle {
        color: hsl(0, 0%, 12%);
        font-weight: 500;
        display: block;
        padding-bottom: 1rem;
      }

      li a {
        display: block;
        color: rgb(145, 145, 145);
        transition: 0.4s ease-in-out;
        padding: 0.3rem 0;

        &:hover {
          transform: translateY(3px);
          color: hsl(225, 50%, 48%);
        }
      }
    }
  }

  .copyRightDiv {
    justify-content: center;
    margin-top: 1.5rem;
    padding: 1rem;
    gap: 1rem;
    border-top: 1px solid rgb(145, 145, 145);
    text-align: center;
  }

  @media screen and (min-width: 480px) {
    .sectionContainer {
      align-items: flex-start;
      grid-template-columns: repeat(2, 1fr);

      .footerLinks {
        justify-content: center;
      }
    }
  }

  @media screen and (min-width: 570px) {
    .sectionContainer {
      padding-top: 2rem;
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media screen and (min-width: 680px) {
    .sectionContainer {
      grid-template-columns: repeat(4, 1fr);
    }
  }
`;

function Footer() {
  return (
    <Container>
      <FooterStyle>
        <div className="sectionContainer container grid">
          <div className="gridOne">
            <div className="logoDiv">
              <img src="/bus64.png" alt="" className="logo" />
            </div>
            <p>Your mind should be stronger than your feeling, fly!</p>
            <div className="socialIcon flex">
              <TiSocialFacebook className="icon" />
              <AiOutlineTwitter className="icon" />
              <AiFillYoutube className="icon" />
              <FaPinterestP className="icon" />
            </div>
          </div>

          <div className="footerLinks">
            <span className="linkTitle">Bus Lines</span>
            <li>
              <a href="/">Trang chủ</a>
            </li>

            <li>
              <a href="/">Liên hệ</a>
            </li>
            <li>
              <a href="/myticket" target="_self">
                Hóa đơn
              </a>
            </li>
          </div>

          <div className="footerLinks">
            <span className="linkTitle">Hướng dẫn</span>
            <li>
              <a href="/">Điều khoản sử dụng</a>
            </li>
            <li>
              <a href="/">Hỏi đáp</a>
            </li>
            <li>
              <a href="/">Hướng dẫn đặt vé trên Web</a>
            </li>
            <li>
              <a href="/">Hướng dẫn đặt vé trên App</a>
            </li>
            <li>
              <a href="/">Mạng lưới văn phòng</a>
            </li>
          </div>

          <div className="footerLinks">
            <span className="linkTitle">Hỗ trợ</span>
            <li>
              <a href="/">Hướng dẫn thanh toán</a>
            </li>
            <li>
              <a href="/">Chính sách bảo mật thông tin</a>
            </li>
            <li>
              <a href="/">Chính sách bảo mật thanh toán</a>
            </li>
            <li>
              <a href="/">Quy chế hoạt động</a>
            </li>
            <li>
              <a href="/">Liên hệ quảng cáo</a>
            </li>
          </div>
        </div>

        <div className="copyRightDiv flex">
          <p>
            Bản quyền thuộc về Công ty Cổ phần Xe Khách Bus Lines |{' '}
            <a target="_blank" href="/">
              busticket.net.eu.org{' '}
            </a>
          </p>
        </div>
      </FooterStyle>
    </Container>
  );
}
export default Footer;
