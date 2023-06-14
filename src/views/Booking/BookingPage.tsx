import { Button, Col, Row, Select } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import StepLine from 'components/StepLine';
import TripRouteCard from 'components/TripRouteCard';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { InfoCard } from 'components/TripRouteCard/index';
import { useLocation, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { appSelector } from 'state/app/reducer';
import { useAppDispatch } from 'state';
import { fetchAllTripRoutes } from 'state/app/action';
import { LocationCommon } from 'utils/appData';
import { CoachModelLabel, ICoachModel } from 'views/Admin/tabs/Assets';

const { Option } = Select;

// input
export interface InfoSearch {
  departure: string;
  destination: string;
  date: string;
}

interface CoachModelSortOption {
  value: ICoachModel;
  label: string;
}

enum ISortValue {
  'ASC' = 'asc',
  'DESC' = 'desc',
  'NONE' = 'none',
}

const sortDefaulLabel = {
  [ISortValue.ASC]: 'Tăng dần',
  [ISortValue.DESC]: 'Giảm dần',
  [ISortValue.NONE]: '',
};

interface SortDefultOption {
  value: ISortValue;
  label: string;
}

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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const infoSearch: InfoSearch = {
    departure: searchParams.get('departure') || '',
    destination: searchParams.get('destination') || '',
    date: searchParams.get('date') || '',
  };

  const { tripRoutes, loading } = useSelector(appSelector);
  console.log('🚀 ~ file: BookingPage.tsx:71 ~ tripRoutes:', tripRoutes);

  const content = 0;

  const [sortPrice, setSortPrice] = useState<ISortValue>(ISortValue.NONE);

  const [typeBus, setTypeBus] = useState<ICoachModel>(ICoachModel.NONE);

  const [timeSelected, setTimeSelected] = useState<0 | 1 | 2 | 3 | 4>(0);

  const [routesRender, setRoutesRender] = useState<InfoCard[]>([]);

  const [allTripRoute, setAllTripRoute] = useState<InfoCard[]>([]);

  const getAllTripRoute = () => {
    if (loading === 'succeeded' && tripRoutes.length) {
      const tripRoutesResults: InfoCard[] = tripRoutes
        .filter(
          (tripRoute) =>
            LocationCommon.isSubstring(tripRoute.origin, infoSearch.departure) &&
            LocationCommon.isSubstring(tripRoute.destination, infoSearch.destination) &&
            tripRoute.departureTime.includes(infoSearch.date.trim()),
        )
        .map((item) => ({
          ...item,
          timeDeparture: item.departureTime.split(' ')[0],
          timeArrival: item.arrivalTime.split(' ')[0],
          seatsAvailable: item.capacity,
          departure: item.origin,
          arrival: item.destination,
          type: item.model,
          distance: '200km',
          duration: item.duration,
        }));
      setRoutesRender([...tripRoutesResults]);
      setAllTripRoute([...tripRoutesResults]);
    }
  };

  useEffect(() => {
    if (loading === 'idle') dispatch(fetchAllTripRoutes());
    else getAllTripRoute();
  }, []);

  useEffect(() => {
    if (loading === 'succeeded') getAllTripRoute();
  }, [loading]);

  useEffect(() => {
    const temp: InfoCard[] = [...allTripRoute];

    const sortRoutes =
      sortPrice === 'asc'
        ? temp.sort((a, b) => a.price - b.price)
        : sortPrice === 'desc'
        ? temp.sort((a, b) => b.price - a.price)
        : temp;

    let filteredRoutes = sortRoutes.filter(
      (route) => typeBus === ICoachModel.NONE || route.type === CoachModelLabel[typeBus],
    );

    const { start, end } = timeRanges[timeSelected];
    if (timeSelected)
      filteredRoutes = filteredRoutes.filter((route) => {
        const [hour] = route.timeDeparture.split(':');
        const hourNumber = parseInt(hour, 10);
        return hourNumber >= start && hourNumber < end;
      });
    setRoutesRender(filteredRoutes);
  }, [sortPrice, timeSelected, typeBus, allTripRoute]);

  const coachModelOptions: CoachModelSortOption[] = [
    ICoachModel.GHE,
    ICoachModel.GIUONG_NAM,
    ICoachModel.PHONG_NAM,
  ].map((item) => ({
    value: item,
    label: CoachModelLabel[item],
  }));

  const sortlOptions: SortDefultOption[] = [ISortValue.ASC, ISortValue.DESC].map((item) => ({
    value: item,
    label: sortDefaulLabel[item],
  }));

  const handleContinueButton = (infoCard: InfoCard) => {
    navigate(
      {
        pathname: '/booking/confirming',
        search: `${location.search}`,
      },
      {
        state: {
          infoCard: { ...infoCard },
          seats: [],
          seatsId: [],
        },
      },
    );
  };

  return (
    <Container>
      <Row style={{ fontSize: '24px', fontWeight: 'bold' }}>
        {infoSearch.departure} - {infoSearch.destination}{' '}
      </Row>
      <Row style={{ fontSize: '14px', margin: '8px 0 16px' }}>{infoSearch.date}</Row>
      <StepLine currentStep={content} />
      <Row gutter={[16, 16]} style={{ padding: '20px 0 35px' }}>
        <Col span={6}>
          <StyledSelect
            placeholder="Giá tiền"
            onChange={(value: any) => setSortPrice(value || ISortValue.NONE)}
            options={sortlOptions}
            allowClear
          />
        </Col>
        <Col span={6}>
          <StyledCoachModelSelect
            placeholder="Loại ghế ngồi"
            onChange={(value: any) => {
              setTypeBus(value || ICoachModel.NONE);
            }}
            allowClear
            options={coachModelOptions}
          />
        </Col>
        <Col span={6}>
          <StyledSelect onChange={(value: any) => setTimeSelected(value || 0)} placeholder="Thời gian" allowClear>
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
        <TripRouteCard
          key={route.id}
          {...route}
          onClick={() => {
            handleContinueButton(route);
          }}
        />
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

const StyledCoachModelSelect = styled(Select)`
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
