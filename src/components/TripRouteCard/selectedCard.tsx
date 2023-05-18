import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Button, Col, Row } from 'antd';

const oneSideSeats = (
  start: number,
  end: number,
  keyword: string,
  handleSelected: (seatId: number) => void,
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
              onClick={() => handleSelected(start)}
              disabled={seatStatuses[start] === 'booked'}
              selected={seatStatuses[start] === 'selected'}
            >
              {boxkeyword}
            </Box>
          </Item>
          <Item />
          <Item>
            <Box
              onClick={() => handleSelected(start + 1)}
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
            onClick={() => handleSelected(i)}
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

function getSeatStatuses(seatss: boolean[]): SeatStatus[] {
  return seatss.map((seat) => {
    if (seat) {
      return 'booked';
    }
    return 'empty';
  });
}

const SeatSelection: React.FC = () => {
  // edit status seats from input
  const seatStatuses = useMemo(() => getSeatStatuses(seats), [seats]);

  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  useEffect(() => {
    console.log('selected seats:', selectedSeats);
  }, [selectedSeats]);

  const handleSeatClick = (seatId: number) => {
    if (seatStatuses[seatId] === 'empty') {
      // add a check for the status property
      seatStatuses[seatId] = 'selected';
      setSelectedSeats([...selectedSeats, seatId]);
    } else if (seatStatuses[seatId] === 'selected') {
      // add a check for the status property
      seatStatuses[seatId] = 'empty';
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
    }
  };

  const totalPrice = selectedSeats.length * 100000;

  return (
    <Wrapper>
      <Header>
        <Schedule>Lịch trình chuyến đi</Schedule>
      </Header>
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
      <Footer>
        <TicketInfo>
          {selectedSeats.length} tickets: {totalPrice.toLocaleString()} VND
        </TicketInfo>
        <Button type="primary" disabled={selectedSeats.length === 0}>
          Proceed to Payment
        </Button>
      </Footer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
`;

const Schedule = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
`;

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

const TicketInfo = styled.div`
  font-size: 18px;
`;

const Group = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 20px;
  margin-bottom: 8px;
`;

const Item = styled.div`
  width: 33.33%;
  padding: 8px 16px;
`;

const Box = styled.div<{ selected: boolean; disabled: boolean }>`
  border-radius: 10px;
  height: 45px;
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
