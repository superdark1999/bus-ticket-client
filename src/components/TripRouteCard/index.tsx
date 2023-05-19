import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Checkbox } from 'antd';
import { EnvironmentOutlined, SwapRightOutlined, WifiOutlined, RestOutlined } from '@ant-design/icons';
import SeatSelection from './selectedCard';

export interface Props {
  id: number;
  timeDeparture: string;
  timeArrival: string;
  price: number;
  type: string;
  seatsAvailable: number;
  distance: string;
  duration: string;
  departure: string;
  arrival: string;
}

const BookingInfo: React.FC<Props> = ({ ...props }) => {
  useEffect(() => {});
  const [selected, setSelected] = useState<boolean>(false);

  const handleCheckbox = () => {
    setSelected(!selected);

    // TODO: call API to get list seat
    // Transmitting the seating list, quantity, and price to SeatSelection component.
  };
  return (
    <Container selected={selected}>
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
        {props.price}đ
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
              Xe tuyến: {props.distance} = {props.duration}
            </Distance>
          </RouteLine>
          <RouteLine>
            <LocationIcon />
            {props.arrival}
          </RouteLine>
        </RouterInfo>
        <CheckboxContainer>
          <Checkbox checked={selected} onChange={handleCheckbox} />
          Chọn
        </CheckboxContainer>
      </RouteContainer>
      {selected && <SeatSelection />}
    </Container>
  );
};

const Container = styled.div<{ selected: boolean }>`
  padding: 20px;
  border-radius: 8px;
  border: ${({ selected }) => (selected ? '2px solid #1677ff' : '1px solid #dde2e8')};
  margin-bottom: 20px;
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
  min-width: 200px;
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
  line-height: 48px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: #01613d;
  font-size: 13px;
  width: 34px;
`;

export default BookingInfo;