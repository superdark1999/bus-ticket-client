import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Col, Row } from 'antd';
import { InfoCard } from 'components/TripRouteCard/index';

// TODO: add new type bus (now has limousine)
// display seat in one side for bus 34, 24 , 40 seats
const oneSideSeats = (
  start: number,
  end: number,
  keyword: string,
  handleSelected: (seatId: number, seatName: string) => void,
  seatStatuses: string[],
): JSX.Element[] => {
  const boxes: JSX.Element[] = [];
  const amount = end - start;
  if (amount === 20) end -= 5;

  for (let i = start; i < end; i++) {
    const boxNumber = i + 1;
    const boxkeyword = `${keyword}${String(boxNumber - start).padStart(2, '0')}`;

    if (i === start && amount === 17) {
      boxes.push(
        <>
          <Item amount={3}>
            <Box
              onClick={() => handleSelected(start, boxkeyword)}
              disabled={seatStatuses[start] === 'booked'}
              selected={seatStatuses[start] === 'selected'}
            >
              {boxkeyword}
            </Box>
          </Item>
          <Item amount={3} />
          <Item amount={3}>
            <Box
              onClick={() => handleSelected(start + 1, `${keyword}${String(boxNumber + 1 - start).padStart(2, '0')}`)}
              disabled={seatStatuses[start + 1] === 'booked'}
              selected={seatStatuses[start + 1] === 'selected'}
            >{`${keyword}${String(boxNumber + 1 - start).padStart(2, '0')}`}</Box>
          </Item>
        </>,
      );
    } else if ((i !== start + 1 && amount === 14) || amount === 20 || amount === 12) {
      boxes.push(
        <Item key={`group-${i}`} amount={amount !== 12 ? 3 : 2}>
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

// add 5 seats in bus 40 seats
const addPlusSeats = (
  start: number,
  end: number,
  keyword: string,
  handleSelected: (seatId: number, seatName: string) => void,
  seatStatuses: string[],
): JSX.Element[] => {
  const boxes: JSX.Element[] = [];

  for (let i = start; i < end; i++) {
    const boxNumber = i + 1;
    const boxkeyword = `${keyword}${String(boxNumber - start + 14).padStart(2, '0')}`; // plus 14 to get seat 15

    boxes.push(
      <Item key={`group-${i}`} amount={5}>
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
  return boxes;
};

const posSeatsBus16 = (
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
          <Item amount={4} />
          <Item amount={4} />
          <Item amount={4}>
            <Box
              onClick={() => handleSelected(start, boxkeyword)}
              disabled={seatStatuses[start] === 'booked'}
              selected={seatStatuses[start] === 'selected'}
            >
              {boxkeyword}
            </Box>
          </Item>
          <Item amount={4}>
            <Box
              onClick={() => handleSelected(start + 1, `${keyword}${String(boxNumber + 1 - start).padStart(2, '0')}`)}
              disabled={seatStatuses[start + 1] === 'booked'}
              selected={seatStatuses[start + 1] === 'selected'}
            >{`${keyword}${String(boxNumber + 1 - start).padStart(2, '0')}`}</Box>
          </Item>
        </>,
      );
    } else if (i !== start + 1) {
      if ((i + 1) % 3 === 0 && i + 1 !== 3 && i + 1 !== 15) {
        boxes.push(<Item amount={4} />);
      }
      boxes.push(
        <Item key={`group-${i}`} amount={4}>
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

// convert input into type appropriate
export type SeatStatus = 'booked' | 'empty' | 'selected';

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
  handleUpdateState: (seatId: number, seatName: string, seatStatuses: SeatStatus[]) => void;
}

const SeatSelection: React.FC<Props> = ({ infoCard, seatsSelected, seatsId, handleUpdateState }) => {
  // edit status seats from input
  const seatStatuses = useMemo(() => getSeatStatuses(infoCard.bookedSeat, seatsId), [infoCard.bookedSeat]);

  const selectedSeatsId = seatsId;
  const selectedSeatsArray = seatsSelected;
  console.log('minh2 ', infoCard);

  const handleSeatClick = (seatId: number, seatName: string) => {
    handleUpdateState(seatId, seatName, seatStatuses);
    // if (seatStatuses[seatId] === 'empty') {
    //   // add a check for the status property
    //   seatStatuses[seatId] = 'selected';
    //   setSelectedSeatsId([...selectedSeatsId, seatId]);
    //   setSelectedSeatsArray([...selectedSeatsArray, seatName]);
    // } else if (seatStatuses[seatId] === 'selected') {
    //   // add a check for the status property
    //   seatStatuses[seatId] = 'empty';
    //   setSelectedSeatsId(selectedSeatsId.filter((id) => id !== seatId));
    //   setSelectedSeatsArray(selectedSeatsArray.filter((name) => name !== seatName));
    // }
  };

  const totalPrice = selectedSeatsId.length * infoCard.price;

  return (
    <Container>
      <Wrapper>
        <SeatContainer>
          <Row
            style={{
              width: '100%',
              height: '48px',
              borderRadius: '8px 8px 0 0',
              borderBottom: '1px solid #ebedee',
              backgroundColor: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {infoCard.capacity === 16 ? (
              <Col span={12}>
                <Title style={{ textAlign: 'center' }}>Chỗ ngồi</Title>
              </Col>
            ) : (
              <>
                <Col span={12}>
                  <Title style={{ textAlign: 'center' }}>Tầng dưới</Title>
                </Col>
                <Col span={12}>
                  <Title style={{ textAlign: 'center' }}>Tầng trên</Title>
                </Col>
              </>
            )}
          </Row>
          <Row style={{ width: '100%', backgroundColor: 'rgb(248, 249, 249)', justifyContent: 'center' }}>
            {infoCard.capacity === 16 ? (
              <Col span={12}>
                <Group>{posSeatsBus16(0, infoCard.capacity - 1, '', handleSeatClick, seatStatuses)}</Group>
              </Col>
            ) : (
              <>
                <Col span={12} style={{ borderRight: '5px solid lightgray' }}>
                  <Group>{oneSideSeats(0, infoCard.capacity / 2, 'A', handleSeatClick, seatStatuses)}</Group>
                  {infoCard.capacity === 40 && (
                    <Group style={{ margin: '0 26px' }}>
                      {infoCard.capacity / 2 === 20 &&
                        addPlusSeats(
                          infoCard.capacity / 2 - 5,
                          infoCard.capacity / 2,
                          'A',
                          handleSeatClick,
                          seatStatuses,
                        )}
                    </Group>
                  )}
                </Col>
                <Col span={12}>
                  <Group>
                    {oneSideSeats(infoCard.capacity / 2, infoCard.capacity, 'B', handleSeatClick, seatStatuses)}
                  </Group>
                  {infoCard.capacity === 40 && (
                    <Group style={{ margin: '0 26px' }}>
                      {infoCard.capacity / 2 === 20 &&
                        addPlusSeats(infoCard.capacity - 5, infoCard.capacity, 'B', handleSeatClick, seatStatuses)}
                    </Group>
                  )}
                </Col>
              </>
            )}
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
        {/* {!infoCard.hiddenBtn && (
          <Button type="primary" disabled={selectedSeatsId.length === 0} onClick={handleContinueButton}>
            Tiếp tục
          </Button>
        )} */}
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
  justify-content: space-between;
`;

const Item = styled.div<{ amount: number }>`
  width: ${({ amount }) => (amount === 5 ? '15%' : amount === 2 ? '40%' : amount === 4 ? '23.33%' : '25.33%')};
  padding: ${({ amount }) => (amount === 5 ? '' : amount === 4 ? '8px 8px' : '8px 16px')};
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
