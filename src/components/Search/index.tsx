import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Form, Select, DatePicker, Button, Col, FormInstance } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { RxCalendar } from 'react-icons/rx';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { appSelector } from 'state/app/reducer';
import { useAppDispatch } from 'state';
import { fetchAllTripRoutes } from 'state/app/action';
import { LocationCommon } from 'utils/appData';
import { v4 } from 'uuid';

const DATE_FORMAT = 'DD/MM/YYYY';

const SearchStyle = styled.div`
  .ant-picker {
    width: 100%;
  }

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
            opacity: 0.7;
          }
        }

        .text {
          h4 {
            padding-top: 0%;
            padding-bottom: 0.7rem;
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
              opacity: 0.5;
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

const CustomLabel = styled.div`
  display: inline-flex;
  font-size: 20px;
  font-weight: 500;
  align-items: flex-start;
  gap: 5px;
  transform: translateY(6px);
  svg {
    font-size: 30px;
  }
`;

interface SearchOption {
  label: string;
  value: string;
}

interface FormValue {
  start: string;
  end: string;
  date: Dayjs;
}

const Search = () => {
  const dispatch = useAppDispatch();
  const { loading, tripRoutes, locationData } = useSelector(appSelector);
  const [originOptions, setOriginOptions] = useState<SearchOption[]>([]);
  const [desOptions, setDesOptions] = useState<SearchOption[]>([]);
  const [dateOptions, setDateOptions] = useState<string[]>([]);
  const formRef = React.useRef<FormInstance<FormValue>>(null);

  const [refreshKey, setRefreshKey] = useState(v4());

  const navigate = useNavigate();

  dayjs.extend(customParseFormat);

  const config = {
    rules: [{ type: 'object' as const, required: true, message: 'Vui lòng chọn ngày đi!' }],
  };

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);

    // link to booking
    navigate({
      pathname: '/booking',
      search: `?departure=${values.start}&destination=${values.end}&date=${(values.date as Dayjs).format(DATE_FORMAT)}`,
    });
  };

  useEffect(() => {
    if (loading === 'idle') {
      dispatch(fetchAllTripRoutes());
    }
  }, []);

  useEffect(() => {
    if (loading === 'succeeded' && locationData.length && tripRoutes.length) {
      const listOrigin = locationData.filter((city) =>
        tripRoutes.some((tripRoute) => tripRoute.origin.toLocaleLowerCase().includes(city.Name.toLocaleLowerCase())),
      );
      setOriginOptions(
        listOrigin.map((item) => ({
          value: item.Name,
          label: item.Name,
        })),
      );
    }
  }, [loading, tripRoutes, locationData]);

  useEffect(() => {
    setTimeout(() => {
      if (!formRef.current) return;
      const { start, end, date } = formRef.current.getFieldsValue();
      let newDesOptions: SearchOption[] = [];
      if (start)
        newDesOptions = locationData
          .filter((city) =>
            tripRoutes.some(
              (tripRoute) =>
                LocationCommon.isSubstring(tripRoute.origin, start) &&
                LocationCommon.isSubstring(tripRoute.destination, city.Name),
            ),
          )
          .map((city) => ({
            label: city.Name,
            value: city.Name,
          }));
      setDesOptions(newDesOptions);
      if (!newDesOptions.some((option) => option.value === end)) formRef.current.setFieldValue('end', null);

      let newDateOptions: string[] = [];
      if (start && end)
        newDateOptions = tripRoutes
          .filter(
            (tripRoute) =>
              LocationCommon.isSubstring(tripRoute.origin, start) &&
              LocationCommon.isSubstring(tripRoute.destination, end),
          )
          .map((tripRoute) => tripRoute.arrivalTime.split(' ').at(1)?.trim() || '');

      setDateOptions(newDateOptions);
    }, 100);
  }, [refreshKey]);

  return (
    <SearchStyle className="container section">
      <div className="sectionContainer grid">
        <Form
          name="validate_other"
          onFinish={onFinish}
          className="searchInputs flex"
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
          layout="vertical"
          ref={formRef}
        >
          <Col span={4}>
            <Form.Item
              name="start"
              rules={[{ required: true, message: 'Vui lòng chọn điểm đi!' }]}
              label={
                <CustomLabel>
                  <HiOutlineLocationMarker />
                  <span>Điểm đi</span>
                </CustomLabel>
              }
              required={false}
            >
              <Select
                placeholder="Bạn muốn đi từ đâu?"
                showSearch
                filterOption={(inputValue: string, option?: SearchOption) =>
                  LocationCommon.isSubstring(option?.value || '', inputValue)
                }
                options={originOptions}
                onSelect={() => {
                  setRefreshKey(v4());
                }}
                key={refreshKey}
              />
            </Form.Item>
          </Col>

          <Col span={4}>
            <Form.Item
              name="end"
              rules={[{ required: true, message: 'Vui lòng chọn điểm đến!' }]}
              label={
                <CustomLabel>
                  <HiOutlineLocationMarker />
                  <span>Điểm đến</span>
                </CustomLabel>
              }
              required={false}
            >
              <Select
                placeholder="Bạn muốn đi đến đâu?"
                showSearch
                filterOption={(inputValue: string, option?: SearchOption) =>
                  LocationCommon.isSubstring(option?.value || '', inputValue)
                }
                options={desOptions}
                onFocus={(e) => {
                  if (!formRef.current) return;
                  const { start } = formRef.current.getFieldsValue();
                  if (!start) {
                    e.target.blur();
                    formRef.current?.validateFields(['start']);
                  }
                }}
                onSelect={() => {
                  setRefreshKey(v4());
                }}
                key={refreshKey}
              />
            </Form.Item>
          </Col>

          <Col span={4}>
            <Form.Item
              name="date"
              {...config}
              label={
                <CustomLabel>
                  <RxCalendar />
                  <span> Ngày đi</span>
                </CustomLabel>
              }
              required={false}
            >
              <DatePicker
                disabledDate={(date) => {
                  if (date.toISOString() < dayjs().startOf('day').toISOString()) return true;
                  return !dateOptions.includes(date.format(DATE_FORMAT).trim());
                }}
                placeholder="Bạn muốn đi vào ngày nào?"
                key={refreshKey}
                format={DATE_FORMAT}
                onFocus={(e) => {
                  if (!formRef.current) return;
                  const { start, end } = formRef.current.getFieldsValue();
                  if (!start) {
                    e.target.blur();
                    e.currentTarget.blur();
                    formRef.current?.validateFields(['start']);
                    return;
                  }
                  if (!end) {
                    e.target.blur();
                    formRef.current?.validateFields(['end']);
                  }
                }}
              />
            </Form.Item>
          </Col>

          <Button className="btn btnBlock flex" type="primary" htmlType="submit">
            Tìm chuyến xe
          </Button>
        </Form>
      </div>
    </SearchStyle>
  );
};

export default Search;
