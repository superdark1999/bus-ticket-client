// import React from 'react';
// import styled from 'styled-components';

// import { HiOutlineLocationMarker } from 'react-icons/hi';
// import { RxCalendar } from 'react-icons/rx';

// const SearchStyle = styled.div`
//   .sectionContainer {
//     width: 100%;
//     padding: 1.5rem;
//     border: 2px solid hsl(0, 0%, 96%);
//     border-radius: 2rem;
//     row-gap: 2rem;

//     .searchInputs {
//       width: 100%;
//       justify-content: center;
//       flex-direction: column;
//       gap: 1.5rem;

//       .singleInput {
//         .iconDiv {
//             padding: 16px 10px;
//             border-radius: 3rem;
//             background: hsl(180, 17%, 95%);
//             margin-right: 1rem;

//             .icon {
//                 color: hsl(0, 0%, 12%);
//                 opacity: .7;
//             }
//         }

//         .text {
//             h4 {
//                 padding-top: 0%;
//                 padding-bottom: .7rem;
//                 color: hsl(0, 0%, 12%);
//                 font-weight: 700;
//             }

//             input {
//                 width: 95%;
//                 border: none;
//                 outline: none;
//                 background: transparent;

//                 &::placeholder {
//                     font-size: 12px;
//                     opacity: .5;
//                 }
//             }
//         }
//       }

//       .btnBlock {
//         justify-content: center;
//       }
//     }
//   }

//   @media screen and (min-width: 480px) {
//     .sectionContainer {
//       .searchInputs {
//         display: grid;
//         grid-template-columns: repeat(2, 1fr);
//       }
//     }
//   }

//   @media screen and (min-width: 680px) {
//     .sectionContainer {
//       .searchInputs {
//         grid-template-columns: repeat(3, 1fr);
//       }
//     }
//   }

//   @media screen and (min-width: 768px) {
//     .sectionContainer {
//       .searchInputs {
//         grid-template-columns: repeat(4, 1fr);

//         .singleInput {
//           .text {
//             input {
//               width: 100%;
//             }
//           }
//         }
//       }
//     }
//   }

//   @media screen and (min-width: 960px) {
//     .sectionContainer {
//       .searchInputs {
//         grid-template-columns: repeat(5, 1fr);
//       }
//     }
//   }

//   @media screen and (min-width: 1024px) {
//     .sectionContainer {
//       .searchInputs {
//         grid-template-columns: repeat(5, 1fr);
//       }
//     }
//   }
// `;

// const Search = () => (
//   <SearchStyle className="container section">
//     <div className="sectionContainer grid">
//       <div className="searchInputs flex">
//         {/* Single Input */}
//         <div className="singleInput flex">
//           <div className="iconDiv">
//             <HiOutlineLocationMarker className="icon" />
//           </div>

//           <div className="text">
//             <h4>Điểm đi</h4>
//             <input type="text" placeholder="Bạn muốn đi từ đâu?" />
//           </div>
//         </div>
//         {/* Single Input */}
//         <div className="singleInput flex">
//           <div className="iconDiv">
//             <HiOutlineLocationMarker className="icon" />
//           </div>

//           <div className="text">
//             <h4>Điểm đến</h4>
//             <input type="text" placeholder="Bạn muốn đi tới đâu?" />
//           </div>
//         </div>
//         {/* Single Input */}
//         <div className="singleInput flex">
//           <div className="iconDiv">
//             <RxCalendar className="icon" />
//           </div>

//           <div className="text">
//             <h4>Ngày đi</h4>
//             <input type="text" placeholder="Bạn muốn đi vào ngày nào?" />
//           </div>
//         </div>

//         {/* Single Input */}
//         <div className="singleInput flex">
//           <div className="iconDiv">
//             <RxCalendar className="icon" />
//           </div>

//           <div className="text">
//             <h4>Số vé</h4>
//             <input type="text" placeholder="Bạn muốn mua bao nhiêu vé?" />
//           </div>
//         </div>

//         <button className="btn btnBlock flex" type="button">
//           Tìm chuyến xe
//         </button>
//       </div>
//     </div>
//   </SearchStyle>
// );

// export default Search;

import React from 'react';
import styled from 'styled-components';
import { Form, Select, DatePicker, InputNumber, Button } from 'antd'
import type { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";


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

      .btnBlock {
        justify-content: center;
      }
    }
  }

  @media screen and (min-width: 480px) {
    .sectionContainer {
      .searchInputs {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }

  @media screen and (min-width: 680px) {
    .sectionContainer {
      .searchInputs {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  }

  @media screen and (min-width: 768px) {
    .sectionContainer {
      .searchInputs {
        grid-template-columns: repeat(4, 1fr);

        .singleInput {
          .text {
            input {
              width: 100%;
            }
          }
        }
      }
    }
  }

  @media screen and (min-width: 960px) {
    .sectionContainer {
      .searchInputs {
        grid-template-columns: repeat(5, 1fr);
      }
    }
  }

  @media screen and (min-width: 1024px) {
    .sectionContainer {
      .searchInputs {
        grid-template-columns: repeat(5, 1fr);
      }
    }
  }
`;

const Search = () => {

  dayjs.extend(customParseFormat);
  const { Option } = Select;


  const config = {
    rules: [{ type: 'object' as const, required: true, message: 'Please select time!' }],
  };


  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  // const { RangePicker } = DatePicker;

  const range = (start: number, end: number) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  // eslint-disable-next-line arrow-body-style
  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().startOf("day");
  };

  const disabledDateTime = () => ({
    disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56],
  });

  // const disabledRangeTime: RangePickerProps["disabledTime"] = (_, type) => {
  //   if (type === "start") {
  //     return {
  //       disabledHours: () => range(0, 60).splice(4, 20),
  //       disabledMinutes: () => range(30, 60),
  //       disabledSeconds: () => [55, 56],
  //     };
  //   }
  //   return {
  //     disabledHours: () => range(0, 60).splice(20, 4),
  //     disabledMinutes: () => range(0, 31),
  //     disabledSeconds: () => [55, 56],
  //   };
  // };

  return (
    <SearchStyle className="container section">
      <div className="sectionContainer grid">
        <Form
          name="validate_other"
          onFinish={onFinish}
          className="searchInputs flex">
          {/* Single Input */}
          <div className="singleInput flex">
            <div className="iconDiv">
              <HiOutlineLocationMarker className="icon" />
            </div>

            <div className="text">
              <h4>Điểm đi</h4>
              <Form.Item
                name="start"
                hasFeedback
                rules={[{ required: true, message: 'Vui lòng chọn điểm đi!' }]}
              >
                <Select placeholder="Bạn muốn đi từ đâu?">
                  <Option value="china">China</Option>
                  <Option value="usa">U.S.A</Option>
                </Select>
              </Form.Item>

            </div>
          </div>
          {/* Single Input */}
          <div className="singleInput flex">
            <div className="iconDiv">
              <HiOutlineLocationMarker className="icon" />
            </div>

            <div className="text">
              <h4>Điểm đến</h4>
              <Form.Item
                name="end"
                hasFeedback
                rules={[{ required: true, message: 'Vui lòng chọn điểm đến!' }]}
              >
                <Select placeholder="Bạn muốn đi đến đâu?">
                  <Option value="china">China</Option>
                  <Option value="usa">U.S.A</Option>
                </Select>
              </Form.Item>
            </div>
          </div>
          {/* Single Input */}
          <div className="singleInput flex">
            <div className="iconDiv">
              <RxCalendar className="icon" />
            </div>

            <div className="text">
              <h4>Ngày đi</h4>
              <Form.Item name="date" {...config}
              >
                <DatePicker
                  disabledDate={disabledDate}
                  disabledTime={disabledDateTime}
                  placeholder="Bạn muốn đi vào ngày nào?" />
              </Form.Item>
              {/* <input type="text" placeholder="Bạn muốn đi vào ngày nào?" /> */}
            </div>
          </div>

          {/* Single Input */}
          <div className="singleInput flex"  >
            <div className="iconDiv">
              <RxCalendar className="icon" />
            </div>

            <div className="text">
              <h4>Số vé muốn mua</h4>
              <Form.Item>
                <Form.Item name="quantity" noStyle
                  hasFeedback
                  rules={[{ required: true, message: 'Vui lòng chọn số vé muốn mua!' }]}>
                  <InputNumber min={1} max={10} />
                </Form.Item>
                <span className="ant-form-text" style={{ marginLeft: 8 }}>
                  VÉ
                </span>
              </Form.Item>
            </div>
          </div>

          <Button className="btn btnBlock flex" type="primary" htmlType="submit">
            Tìm chuyến xe
          </Button>
        </Form>
      </div>
    </SearchStyle >
  )
}


export default Search;
