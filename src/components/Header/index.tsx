import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { SiConsul } from 'react-icons/si';
import { BsPhoneVibrate } from 'react-icons/bs';
import { AiOutlineGlobal } from 'react-icons/ai';
import { CgMenuGridO } from 'react-icons/cg';

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
    background: hsl(180, 17%, 95%);
    
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
    box-shadow: rgba(0 , 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
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
  // const [active, setActive] = useState('navBarMenu');
  // const showNavBar = () => {
  //   setActive('navBarMenu showNavBar');
  // };

  // const removeNavBar = () => {
  //   setActive('navBarMenu ');
  // };

  // Thêm background vào navBarTwo khi scroll chuột
  const [noBg, addBg] = useState('navBarTwo');
  // const addBgColor = () => {
  //   if (window.scrollY >= 10) {
  //     addBg('navBarTwo navBar_With_Bg');
  //   } else {
  //     addBg('navBarTwo ');
  //   }
  // };

  // window.addEventListener('scroll', addBgColor)

  useEffect(() => {
    const addBgColor = () => {
      if (window.scrollY >= 10) {
        addBg('navBarTwo navBar_With_Bg');
      } else {
        addBg('navBarTwo');
      }
    };
  
    window.addEventListener('scroll', addBgColor);
  
    return () => {
      window.removeEventListener('scroll', addBgColor);
    };
  }, []);

  return (
    <Container>
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

        {/* noBg la navbarTwo */}
        <div className={noBg}>
          <div className="logoDiv">
            <img src="/bus64.png" className="logo" alt="" />
          </div>

          {/* className ở đây là navBarMenu */}
          <div className="navBarMenu">
            <ul className="menu flex">
              <li className="listItem">Trang chủ</li>
              <li className="listItem">Lịch trình</li>
              <li className="listItem">Tin tức</li>
              <li className="listItem">Liên hệ</li>
              <li className="listItem">Hóa đơn</li>
            </ul>
          </div>
          <button type="button"  className="toggleIcon">
            <CgMenuGridO className="icon" />
          </button>
        </div>
      </NavBar>
    </Container>
  );
}
