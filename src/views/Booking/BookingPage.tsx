import { Button, Col, Row, Select } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import StepLine from 'components/StepLine';
import BookingInfo from 'components/TripRouteCard';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { InfoCard } from 'components/TripRouteCard/index';
import { useLocation, useNavigate } from 'react-router';
import moment from 'moment';

const { Option } = Select;

// input
export interface InfoSearch {
  departure: string;
  destination: string;
  date: string;
}

// Mock data
const tripRoutes: InfoCard[] = [
  {
    id: 1,
    timeDeparture: '8:00',
    timeArrival: '12:00',
    price: 289000,
    seatsAvailable: 21,
    departure: 'Bến xe Phía Nam Nha Trang',
    arrival: ' Bến xe Miền Tây',
    type: 'Ghế',
    distance: '200km',
    duration: '9 tiếng',
  },
  {
    id: 2,
    timeDeparture: '10:00',
    timeArrival: '14:00',
    price: 350000,
    seatsAvailable: 15,
    departure: 'Bến xe Phía Nam Nha Trang',
    arrival: ' Bến xe Miền Tây',
    type: 'Giường',
    distance: '200km',
    duration: '9 tiếng',
  },
  {
    id: 3,
    timeDeparture: '12:00',
    timeArrival: '16:00',
    price: 450000,
    seatsAvailable: 8,
    departure: 'Bến xe Phía Nam Nha Trang',
    arrival: ' Bến xe Miền Tây',
    type: 'Limousine',
    distance: '200km',
    duration: '9 tiếng',
  },
  {
    id: 4,
    timeDeparture: '14:00',
    timeArrival: '18:00',
    price: 250000,
    seatsAvailable: 30,
    departure: 'Bến xe Phía Nam Nha Trang',
    arrival: ' Bến xe Miền Tây',
    type: 'Limousine',
    distance: '200km',
    duration: '9 tiếng',
  },
  {
    id: 5,
    timeDeparture: '16:00',
    timeArrival: '20:00',
    price: 550000,
    seatsAvailable: 5,
    departure: 'Bến xe Phía Nam Nha Trang',
    arrival: ' Bến xe Miền Tây',
    type: 'Limousine',
    distance: '200km',
    duration: '9 tiếng',
  },
];

// Option to select time
const timeRanges = {
  '0': { start: 0, end: 24 },
  '1': { start: 0, end: 6 },
  '2': { start: 6, end: 12 },
  '3': { start: 12, end: 18 },
  '4': { start: 18, end: 24 },
};

const BookingPage: React.FC = () => {
  // get info from param
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const infoSearch: InfoSearch = {
    departure: searchParams.get('departure') || '',
    destination: searchParams.get('destination') || '',
    date: moment(searchParams.get('date')).format('DD/MM/YYYY') || '',
  };

  const content = 0;

  const [sortPrice, setSortPrice] = useState<'asc' | 'desc' | '0'>('0');

  const [typeBus, setTypeBus] = useState<'Ghế' | 'Giường' | 'Limousine' | '0'>('0');

  const [timeSelected, setTimeSelected] = useState<0 | 1 | 2 | 3 | 4>(0);

  const [routesRender, setRoutesRender] = useState<InfoCard[]>(JSON.parse(JSON.stringify(tripRoutes)));

  useEffect(() => {
    // TODO: sort triproute with time
    // call API to get data from infoSearch

    console.log('didmount');
    return () => {
      console.log('unmount', Date.now());
    };
  }, []);

  useEffect(() => {
    const temp: InfoCard[] = JSON.parse(JSON.stringify(tripRoutes));

    const sortRoutes =
      sortPrice === 'asc'
        ? temp.sort((a, b) => a.price - b.price)
        : sortPrice === 'desc'
        ? temp.sort((a, b) => b.price - a.price)
        : temp;

    let filteredRoutes = sortRoutes.filter((route) => route.type === typeBus || typeBus === '0');

    const { start, end } = timeRanges[timeSelected];
    filteredRoutes = filteredRoutes.filter((route) => {
      const [hour] = route.timeDeparture.split(':');
      const hourNumber = parseInt(hour, 10);
      return hourNumber >= start && hourNumber < end;
    });
    setRoutesRender(filteredRoutes);
  }, [sortPrice, timeSelected, typeBus]);

  return (
    <Container>
      <Row style={{ fontSize: '24px', fontWeight: 'bold' }}>
        {infoSearch.departure} - {infoSearch.destination}{' '}
      </Row>
      <Row style={{ fontSize: '14px', margin: '8px 0 16px' }}>{infoSearch.date}</Row>
      <StepLine currentStep={content} />
      <Row gutter={[16, 16]} style={{ padding: '20px 0 35px' }}>
        <Col span={6}>
          <StyledSelect defaultValue="0" onChange={(value) => setSortPrice(value as 'asc' | 'desc' | '0')}>
            <Option value="0">Giá</Option>
            <Option value="asc">Thấp - Cao</Option>
            <Option value="desc">Cao - Thấp</Option>
          </StyledSelect>
        </Col>
        <Col span={6}>
          <StyledSelect
            defaultValue="0"
            onChange={(value) => setTypeBus(value as '0' | 'Ghế' | 'Giường' | 'Limousine')}
          >
            <Option value="0">Loại xe</Option>
            <Option value="Ghế">Ghế</Option>
            <Option value="Giường">Giường</Option>
            <Option value="Limousine">Limousine</Option>
          </StyledSelect>
        </Col>
        <Col span={6}>
          <StyledSelect defaultValue="0" onChange={(value) => setTimeSelected(value as 0 | 1 | 2 | 3 | 4)}>
            <Option value="0">Giờ</Option>
            <Option value="1">0h - 6h</Option>
            <Option value="2">6h - 12h</Option>
            <Option value="3">12h - 18h</Option>
            <Option value="4">18h - 24h</Option>
          </StyledSelect>
        </Col>
      </Row>
      <Row style={{ margin: '20px', fontSize: '18px' }}>
        Chọn giờ lên xe đi {infoSearch.destination} từ {infoSearch.departure} phù hợp
      </Row>
      {routesRender.map((route) => (
        <BookingInfo key={route.id} {...route} />
      ))}
      <Row>
        <BackButton onClick={() => navigate(-1)}>
          <LeftOutlined /> Quay lại
        </BackButton>
      </Row>
    </Container>
  );
};

const Container = styled.div`
  width: 700px;
  background-color: white;
  margin: auto;
  padding-top: 10rem;
`;

const StyledSelect = styled(Select)`
  width: 100%;

  .ant-select-selector {
    border-radius: 20px;
    background-color: rgba(99, 114, 128, 0.1) !important;
  }
`;

const BackButton = styled(Button)`
  width: 100%;
  border-radius: 24px;
  border: 1px solid #c0c6cc;
  background-color: #fff;
  color: #111;
  padding-right: 36px;
  margin: 10px 0 50px;
  height: 40px;
`;

export default BookingPage;
