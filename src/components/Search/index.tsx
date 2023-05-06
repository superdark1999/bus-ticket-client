import React from 'react';
import styled from 'styled-components';

import { HiOutlineLocationMarker } from 'react-icons/hi';
import { RxCalendar } from 'react-icons/rx';

const SearchStyle = styled.div`
  .sectionContainer {
    width: 100%;
    padding: 1.5rem;
    border: 2px solid hsl(0, 0%, 96%);
    border-radius: 2rem;
    row-gap: 2rem;

    .searchInputs {
      width: 100%;
      justify-content: center;
      flex-direction: column;
      gap: 1.5rem;

      .singleInput {
        .iconDiv {
            padding: 16px 10px;
            border-radius: 3rem;
            background: hsl(180, 17%, 95%);
            margin-right: 1rem;

            .icon {
                color: hsl(0, 0%, 12%);
                opacity: .7;
            }
        }

        .text {
            h4 {
                padding-top: 0%;
                padding-bottom: .7rem;
                color: hsl(0, 0%, 12%);
                font-weight: 700;
            }

            input {
                width: 95%;
                border: none;
                outline: none;
                background: transparent;

                &::placeholder {
                    font-size: 12px;
                    opacity: .5;
                }
            }
        }
      }
    }
  }
`;

const Search = () => (
  <SearchStyle className="container section">
    <div className="sectionContainer grid">
      <div className="searchInputs flex">
        {/* Single Input */}
        <div className="singleInput flex">
          <div className="iconDiv">
            <HiOutlineLocationMarker className="icon" />
          </div>

          <div className="text">
            <h4>Điểm đi</h4>
            <input type="text" placeholder="Bạn muốn đi từ đâu?" />
          </div>
        </div>
        {/* Single Input */}
        <div className="singleInput flex">
          <div className="iconDiv">
            <HiOutlineLocationMarker className="icon" />
          </div>

          <div className="text">
            <h4>Điểm đến</h4>
            <input type="text" placeholder="Bạn muốn đi tới đâu?" />
          </div>
        </div>
        {/* Single Input */}
        <div className="singleInput flex">
          <div className="iconDiv">
            <RxCalendar className="icon" />
          </div>

          <div className="text">
            <h4>Ngày đi</h4>
            <input type="text" placeholder="Bạn muốn đi vào ngày nào?" />
          </div>
        </div>

        <button className="btn btnBlock flex" type="button">
          Tìm chuyến xe
        </button>
      </div>
    </div>
  </SearchStyle>
);

export default Search;
