import React from 'react';
import styled from 'styled-components';

import { TiSocialFacebook } from 'react-icons/ti'
import { AiFillYoutube, AiOutlineTwitter } from 'react-icons/ai';
import { FaPinterestP } from 'react-icons/fa'


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
          padding: .4rem;
          color: rgb(145, 145, 145);

          &:hover {
            background: hsl(225, 50%, 48%);
            transform: translateY(-7px);
            transition: .4s ease-in-out;
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
        transition: .4s ease-in-out;
        padding: .3rem 0;

        &:hover {
          transform: translateY(7px);
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
`

function Footer() {
  return <FooterStyle>
    <div className="sectionContainer container grid">

      <div className="gridOne">
        <div className="logoDiv">
          <img src="/bus64.png" alt="" className='logo' />
        </div>
        <p>Your mind should be stronger than your feeling, fly!</p>
        <div className="socialIcon flex">
          <TiSocialFacebook className='icon' />
          <AiOutlineTwitter className='icon' />
          <AiFillYoutube className='icon' />
          <FaPinterestP className='icon' />
        </div>
      </div>

      <div className="footerLinks">
        <span className="linkTitle">Bus Lines</span>
        <li>
          <a href="/">Trang chủ</a>
        </li>
        <li>
          <a href="/">Lịch trình</a>
        </li>
        <li>
          <a href="/">Tin tức</a>
        </li>
        <li>
          <a href="/">Liên hệ</a>
        </li>
        <li>
          <a href="/">Hóa đơn</a>
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
    </div>

    <div className="copyRightDiv flex">
      <p>Bản quyền thuộc về Công ty Cổ phần Xe Khách Bus Lines | <a target='_blank' href="/">www.busline.vn </a></p>
    </div>
  </FooterStyle>;
}
export default Footer;
