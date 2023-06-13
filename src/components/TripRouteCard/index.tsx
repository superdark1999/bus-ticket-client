import React from 'react';
import styled from 'styled-components';
import { EnvironmentOutlined, SwapRightOutlined, WifiOutlined, RestOutlined } from '@ant-design/icons';
import { TripRouteData } from 'views/Admin/tabs/TripRoute';

export interface InfoCard extends TripRouteData {
  timeDeparture: string;
  timeArrival: string;
  type: string;
  seatsAvailable: number;
  distance: string;
  departure: string;
  arrival: string;
  hiddenBtn?: boolean;
  onClick?: () => void;
}

const TripRouteCard: React.FC<InfoCard> = ({ ...props }) => (
  <Container
    onClick={() => {
      if (props.onClick) props.onClick();
    }}
  >
    <FirstRow>
      {props.timeDeparture}
      <SwapRightOutlined />
      {props.timeArrival}
      <Amenities>
        <WifiOutlined style={{ fontSize: '16px', marginRight: '4px' }} />
        <RestOutlined style={{ fontSize: '16px', marginRight: '4px' }} />
      </Amenities>
    </FirstRow>
    <SecondRow>
      {props.price.toLocaleString()}đ
      <Dot />
      {props.type}
      <Dot />
      {props.seatsAvailable} chỗ
    </SecondRow>
    <RouteContainer>
      <RouterInfo>
        <RouteLine>
          <LocationIcon />
          {props.departure}
          <Distance>
            Thời gian dự kiến: {Math.floor(props.duration / 60)} giờ{' '}
            {props.duration % 60 === 0 ? '' : `${props.duration % 60} phút`}
          </Distance>
          {/* Xe tuyến: {props.distance} = {props.duration} */}
        </RouteLine>
        <RouteLine>
          <LocationIcon />
          {props.arrival}
        </RouteLine>
      </RouterInfo>
    </RouteContainer>
    {/* {selected && <SeatSelection infoCard={props} seatsSelected={[]} seatsId={[]} />} */}
  </Container>
);
const Container = styled.div`
  padding: 20px;
  border-radius: 8px;
  box-sizing: border-box;
  border: 2px solid #dde2e8;
  margin-bottom: 20px;
  cursor: pointer;
  &:hover {
    border: 2px solid #1677ff;
  }
`;

const FirstRow = styled.div`
  font-size: 24px;
`;

const Amenities = styled.div`
  float: right;
`;

const SecondRow = styled.div`
  color: #111;
  margin: 8px 0 16px;
  font-size: 15px;
  height: 28px;
  border-radius: 16px;
  padding: 5px 12px;
  display: inline-block;
  background-color: rgba(99, 114, 128, 0.1);
`;

const Dot = styled.span`
  display: inline-block;
  width: 6px;
  border-radius: 3px;
  height: 6px;
  opacity: 0.3;
  margin: 3px 12px;
  background-color: #000;
`;

const RouteContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const RouterInfo = styled.div`
  flex: 1;
`;

const RouteLine = styled.div`
  color: #111;
  font-size: 15px;
  position: relative;
  border-left: 2px dotted #c0c6cc;
  padding-left: 22px;
  margin-left: 8px;

  &:last-child {
    border-left: 2px dotted #fff;
  }
`;

const LocationIcon = styled(EnvironmentOutlined)`
  width: 16px;
  top: 0;
  left: -9px;
  position: absolute;
`;

const Distance = styled.div`
  font-size: 13px;
  color: #00613d;
  line-height: 28px;
  height: 30px;
`;

export default TripRouteCard;
