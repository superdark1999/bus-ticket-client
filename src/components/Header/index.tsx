import React, { useState } from 'react';
import styled from 'styled-components';

import { SiConsul } from 'react-icons/si';
import { BsPhoneVibrate } from 'react-icons/bs';
import { AiOutlineGlobal } from 'react-icons/ai';
import { CgMenuGridO } from 'react-icons/cg';

const NavBar = styled.div`
  position: fixed;
  flex-direction: column;
  width: 100%;
  z-index: 1000;

  .navBarOne,
  .navBarTwo {
    justify-content: space-between;
    padding: 1rem;
    width: 100%;
  }

  .navBarOne {
    background: hsl(180, 17%, 95%);

    .icon:hover {
      color: hsl(225, 50%, 48%);
    }
  }

  .navBarTwo {
    display: flex;
    align-items: center;
    justify-content: space-between;
    top: 4rem;
    padding: 1.5rem 1rem;
    position: fixed;
    transition: 0.3s ease-in-out;

    .logoDiv {
      .logo {
        width: 100%;
      }
    }

    @media screen and (max-width: 768px) {
      .navBarMenu {
        position: absolute;
        background: hsl(180, 17%, 95%);
        padding: 1.5rem;
        border-radius: 10px;
        top: 5rem;
        right: -50%;
        width: 80%;
        transform: translateX(50%);
        z-index: 2000;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
        border: 3px solid hsl(0, 0%, 100%);
        transition: 0.4s ease-in-out;

        .menu {
          flex-direction: column;
          gap: 0.5rem;
          text-align: center;

          .listItem {
            padding: 0.5rem 0;
            cursor: pointer;
            color: hsl(0, 0%, 12%);

            &:hover {
              color: hsl(225, 50%, 48%);
              font-weight: 700;
            }
          }
        }
      }

      .toggleIcon {
        .icon {
          font-size: 30px;
          color: hsl(0, 0%, 12%);
        }
      }

      .showNavBar {
        right: 50%;
        transition: 0.5s ease-in-out;
      }
    }
  }

  .navBar_With_Bg {
    background: hsl(180, 17%, 95%);
    padding: 0.5rem 1rem;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  }


  @media screen and (min-width: 768px) {
    align-items: center;

    .navBarOne {
      .flex {
        gap: 1.5rem;

        li {
          font-size: 13px;
          gap: .5rem;
          color: hsl(240, 1%, 48%);
  
          &:hover {
            color: hsl(225, 50%, 48%);
            text-decoration: underline;
          }
        }
      }
     
    }

    .navBarTwo {
      justify-content: space-between;
      align-items: center;

      .logoDiv {
        .logo {
          max-width: 100%;
        }
      }

      .navBarMenu {
        .menu {
          flex-direction: row;
          gap: .5rem;

          .listItem {
            padding: 0 .5rem;
            font-size: 14px;
            cursor: pointer;
            color: hsl(240, 1%, 48%);
            font-weight: 700;

            &:hover {
              color: hsl(225, 50%, 48%);
              font-weight: 700;
              
            }
          }
        }
      }
      

      .btnOne, .toggleIcon {
        display: none;
      }
    }
  }

  @media screen and (min-width: 1024px) {
    .navBarOne, .navBarTwo {
      padding: 1.5rem 5rem;
    }

    .navBar_With_Bg {
      padding: 2rem 5rem;
    }
  }

  @media screen and (min-width: 1332px) {
    .navBarTwo {
      .navBarMenu {
        .menu {
          gap: 1rem;
  
          .listItem {
            padding: 0 1rem;
            font-size: 20px;
          }
        }
      }
    }
  }
`;

export default function Header() {
  const [active, setActive] = useState('navBarMenu');
  const showNavBar = () => {
    setActive('navBarMenu showNavBar');
  };

  // const removeNavBar = () => {
  //   setActive('navBarMenu ');
  // };

  // Thêm background vào navBarTwo khi scroll chuột
  const [noBg, addBg] = useState('navBarTwo');
  const addBgColor = () => {
    if (window.scrollY >= 10) {
      addBg('navBarTwo navBar_With_Bg');
    } else {
      addBg('navBarTwo ');
    }
  };

  window.addEventListener('scroll', addBgColor)

  return (
    <NavBar className="flex">
      <div className="navBarOne flex">
        <div>
          <SiConsul className="icon" />
        </div>

        <div className="flex">
          <li className="flex">
            <BsPhoneVibrate className="icon" /> Hỗ trợ
          </li>
          <li className="flex">
            <AiOutlineGlobal className="icon" /> Ngôn ngữ
          </li>
        </div>

        <button className="btn flex btnOne" type="button">
          Đăng nhập
        </button>
      </div>

      <div className={noBg}>
        <div className="logoDiv">
          <img src="/bus64.png" className="logo" alt="" />
        </div>

        {/* className ở đây là navBarMenu */}
        <div className={active}>
          <ul className="menu flex">
            <li className="listItem">Trang chủ</li>
            <li className="listItem">Lịch trình</li>
            <li className="listItem">Tin tức</li>
            <li className="listItem">Liên hệ</li>
            <li className="listItem">Hóa đơn</li>
          </ul>
        </div>
        <button type="button" onClick={showNavBar} className="toggleIcon">
          <CgMenuGridO className="icon" />
        </button>
      </div>
    </NavBar>
  );
}
