import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Button, Col, Row } from 'antd';
import { useLocation, useNavigate } from 'react-router';
import { Props as InfoCard } from 'components/TripRouteCard/index';

// display seat in one side
const oneSideSeats = (
  start: number,
  end: number,
  keyword: string,
  handleSelected: (seatId: number, seatName: string) => void,
  seatStatuses: string[],
): JSX.Element[] => {
  const boxes: JSX.Element[] = [];

  for (let i = start; i < end; i++) {
    const boxNumber = i + 1;
    const boxkeyword = `${keyword}${String(boxNumber - start).padStart(2, '0')}`;

    if (i === start) {
      boxes.push(
        <>
          <Item>
            <Box
              onClick={() => handleSelected(start, boxkeyword)}
              disabled={seatStatuses[start] === 'booked'}
              selected={seatStatuses[start] === 'selected'}
            >
              {boxkeyword}
            </Box>
          </Item>
          <Item />
          <Item>
            <Box
              onClick={() => handleSelected(start + 1, `${keyword}${String(boxNumber + 1 - start).padStart(2, '0')}`)}
              disabled={seatStatuses[start + 1] === 'booked'}
              selected={seatStatuses[start + 1] === 'selected'}
            >{`${keyword}${String(boxNumber + 1 - start).padStart(2, '0')}`}</Box>
          </Item>
        </>,
      );
    } else if (i !== start + 1) {
      boxes.push(
        <Item key={`group-${i}`}>
          <Box
            onClick={() => handleSelected(i, boxkeyword)}
            disabled={seatStatuses[i] === 'booked'}
            selected={seatStatuses[i] === 'selected'}
          >
            {boxkeyword}
          </Box>
        </Item>,
      );
    }
  }
  return boxes;
};

// list seat mock
const seats = [
  true,
  false,
  true,
  false,
  true,
  true,
  false,
  true,
  false,
  true,
  true,
  false,
  true,
  false,
  true,
  true,
  false,
  true,
  false,
  true,
  true,
  false,
  true,
  false,
  true,
  true,
  false,
  true,
  false,
  true,
  true,
  false,
  true,
  false,
];

// convert input into type appropriate
type SeatStatus = 'booked' | 'empty' | 'selected';

function getSeatStatuses(seatss: boolean[], seatsSelectedId: number[]): SeatStatus[] {
  return seatss.map((seat, index) => {
    if (seat) {
      return 'booked';
    }
    if (seatsSelectedId.includes(index)) {
      return 'selected';
    }
    return 'empty';
  });
}

// input are  array seats, quantity, price seat
interface Props {
  infoCard: InfoCard;
  seatsSelected: string[];
  seatsId: number[];
}

const SeatSelection: React.FC<Props> = ({ infoCard, seatsSelected, seatsId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  // edit status seats from input
  const seatStatuses = useMemo(() => getSeatStatuses(seats, seatsId), [seats]);

  const [selectedSeatsId, setSelectedSeatsId] = useState<number[]>(seatsId);
  const [selectedSeatsArray, setSelectedSeatsArray] = useState<string[]>(seatsSelected);
  console.log('minh2 ', infoCard);

  const handleSeatClick = (seatId: number, seatName: string) => {
    if (seatStatuses[seatId] === 'empty') {
      // add a check for the status property
      seatStatuses[seatId] = 'selected';
      setSelectedSeatsId([...selectedSeatsId, seatId]);
      setSelectedSeatsArray([...selectedSeatsArray, seatName]);
    } else if (seatStatuses[seatId] === 'selected') {
      // add a check for the status property
      seatStatuses[seatId] = 'empty';
      setSelectedSeatsId(selectedSeatsId.filter((id) => id !== seatId));
      setSelectedSeatsArray(selectedSeatsArray.filter((name) => name !== seatName));
    }
  };

  const handleContinueButton = () => {
    console.log(location.search, ' ', infoCard);
    navigate(
      {
        pathname: '/booking/confirming',
        search: `${location.search}`,
      },
      {
        state: {
          infoCard: { ...infoCard },
          seats: selectedSeatsArray,
          seatsId: selectedSeatsId,
        },
      },
    );
  };

  const totalPrice = selectedSeatsId.length * infoCard.price;

  return (
    <Container>
      <Wrapper>
        {/* <Header>
          <Schedule>Lịch trình chuyến đi</Schedule>
        </Header> */}
        <SeatContainer>
          <Row
            style={{
              width: '100%',
              height: '48px',
              borderRadius: '8px 8px 0 0',
              borderBottom: '1px solid #ebedee',
              backgroundColor: '#fff',
              alignItems: 'center',
            }}
          >
            <Col span={12}>
              <Title style={{ textAlign: 'center' }}>Tầng dưới</Title>
            </Col>
            <Col span={12}>
              <Title style={{ textAlign: 'center' }}>Tầng trên</Title>
            </Col>
          </Row>
          <Row style={{ width: '100%', backgroundColor: 'rgb(248, 249, 249)' }}>
            <Col span={12}>
              <Group>{oneSideSeats(0, 17, 'A', handleSeatClick, seatStatuses)}</Group>
            </Col>
            <Col span={12}>
              <Group>{oneSideSeats(17, 34, 'B', handleSeatClick, seatStatuses)}</Group>
            </Col>
            <Row style={{ width: '100%', padding: '14px' }}>
              <Col span={8} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Square selected={false} disabled={false} />
                Trống
              </Col>
              <Col span={8} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Square selected disabled={false} />
                Đang chọn
              </Col>
              <Col span={8} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Square selected={false} disabled />
                Đã đặt
              </Col>
            </Row>
          </Row>
        </SeatContainer>
      </Wrapper>
      <Footer>
        <Col>
          <div>
            {selectedSeatsId.length} vé: {selectedSeatsArray.join(', ')}
          </div>
          <div>
            Tổng tiền: <span style={{ fontSize: '18px' }}>{totalPrice.toLocaleString()}</span> VND
          </div>
        </Col>
        {!infoCard.hiddenBtn && (
          <Button type="primary" disabled={selectedSeatsId.length === 0} onClick={handleContinueButton}>
            Tiếp tục
          </Button>
        )}
      </Footer>
    </Container>
  );
};

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
`;

// const Header = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin-bottom: 24px;
// `;

// const Schedule = styled.h1`
//   font-size: 24px;
//   font-weight: bold;
//   margin: 0;
// `;

const Title = styled.h2`
  font-size: 18px;
  margin: 0;
`;

const SeatContainer = styled.div`
  border-radius: 8px;
  border: 1px solid #ebedee;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 600px;
`;

const Group = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 20px 10px 8px;
  justify-content: center;
`;

const Item = styled.div`
  width: 28.33%;
  padding: 8px 16px;
`;

const Box = styled.div<{ selected: boolean; disabled: boolean }>`
  border-radius: 10px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ selected, disabled }) => (selected ? '#f8beab' : disabled ? 'silver' : '#96c5e7')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  background-color: ${({ selected, disabled }) => (selected ? '#fdede8' : disabled ? '#d5d9dd' : '#def3ff')};
  color: ${({ selected, disabled }) => (selected ? '#000' : disabled ? '#fff' : '#000')};
`;

const Square = styled.div<{ selected: boolean; disabled: boolean }>`
  width: 20px;
  height: 20px;
  margin-right: 5px;
  border-radius: 4px;
  border: 1px solid ${({ selected, disabled }) => (selected ? '#f8beab' : disabled ? 'silver' : '#96c5e7')};
  background-color: ${({ selected, disabled }) => (selected ? '#fdede8' : disabled ? '#d5d9dd' : '#def3ff')};
  color: ${({ selected, disabled }) => (selected ? '#000' : disabled ? '#fff' : '#000')};
`;

export default SeatSelection;
