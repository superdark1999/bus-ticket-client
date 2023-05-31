import { Button, Col, Row, Typography } from 'antd';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import styled from 'styled-components';
import { InfoPayment } from './PaymentPage';

const TicketPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {});

  const data: InfoPayment = location.state?.data || {
    infoSearch: '',
    infoCard: '',
    infoSeat: {
      seats: [],
      seatsId: [],
    },
    shuttle: '',
    infoCus: '',
  };

  return (
    <Wrapper>
      <Container>
        <Row
          justify="center"
          align="middle"
          style={{
            backgroundColor: '#1677ff',
            padding: '10px',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
          }}
        >
          <Typography.Title level={5} style={{ margin: '0', color: '#fff' }}>
            THÔNG TIN VÉ
          </Typography.Title>
        </Row>
        <div
          style={{
            backgroundColor: '#fff',
            borderBottom: '0.5px solid rgba(151, 151, 151, 0.5)',
            padding: '10px 0',
          }}
        >
          <Row justify="center">
            <Typography.Title level={4} style={{ color: 'red' }}>
              Mã vé: 123456
            </Typography.Title>
          </Row>
          <Row justify="center">
            <img src="/QR_code.webp" alt="qr_code" width="150px" height="150px" />
          </Row>
        </div>

        <Row
          align="middle"
          style={{ height: '38px', paddingLeft: '24px', borderBottom: '0.5px solid rgba(151, 151, 151, 0.5)' }}
        >
          <Typography.Title level={5} style={{ margin: '0' }}>
            Thông tin liên hệ
          </Typography.Title>
        </Row>
        <Row
          style={{
            padding: '10px 0 0 24px',
            backgroundColor: '#fff',
            borderBottom: '0.5px solid rgba(151, 151, 151, 0.5)',
          }}
        >
          <Col span={12}>
            <Field>
              <SubTitle>Họ tên:</SubTitle>
              <Typography.Text>{data.infoCus.name}</Typography.Text>
            </Field>
            <Field>
              <SubTitle>Số điện thoại:</SubTitle>
              <Typography.Text>{data.infoCus.phone}</Typography.Text>
            </Field>
            <Field>
              <SubTitle>Email:</SubTitle>
              <Typography.Text>{data.infoCus.email}</Typography.Text>
            </Field>
          </Col>
        </Row>
        <Row
          align="middle"
          style={{ height: '38px', paddingLeft: '24px', borderBottom: '0.5px solid rgba(151, 151, 151, 0.5)' }}
        >
          <Typography.Title level={5} style={{ margin: '0' }}>
            Thông tin chuyến
          </Typography.Title>
        </Row>
        <Row
          style={{
            padding: '10px 0 0 24px',
            backgroundColor: '#fff',
            borderBottom: '0.5px solid rgba(151, 151, 151, 0.5)',
          }}
        >
          <Col span={4}>
            <Field>
              <SubTitle>Tuyến xe:</SubTitle>
            </Field>
            <Field>
              <SubTitle>Thời gian:</SubTitle>
            </Field>
            <Field>
              <SubTitle>Điểm lên xe:</SubTitle>
            </Field>
          </Col>
          <Col span={11}>
            <Field>
              <Typography.Text>
                {data.infoCard.departure} - {data.infoCard.arrival}
              </Typography.Text>
            </Field>
            <Field>
              <Typography.Text>
                {data.infoCard.timeDeparture} {data.infoSearch.date}
              </Typography.Text>
            </Field>
            <Field>
              <Typography.Text>{data.shuttle}</Typography.Text>
            </Field>
          </Col>
          <Col span={4} style={{ paddingLeft: '24px' }}>
            <Field>
              <SubTitle>Số lượng ghế:</SubTitle>
            </Field>
            <Field>
              <SubTitle>Số ghế:</SubTitle>
            </Field>
          </Col>
          <Col span={5} style={{ paddingLeft: '24px' }}>
            <Field>
              <Typography.Text>{data.infoSeat.seatsId.length}</Typography.Text>
            </Field>
            <Field>
              <Typography.Text>{data.infoSeat.seats.join(', ')}</Typography.Text>
            </Field>
          </Col>
        </Row>
        <Row
          justify="center"
          style={{
            flexDirection: 'column',
            alignItems: 'end',
            height: '70px',
            paddingRight: '24px',
            borderBottomLeftRadius: '8px',
            borderBottomRightRadius: '8px',
          }}
        >
          <FooterTitle>TỔNG TIỀN</FooterTitle>
          <FooterPrice>{(data.infoCard.price * data.infoSeat.seatsId.length).toLocaleString()} VND</FooterPrice>
        </Row>
      </Container>
      <Row justify="center">
        <StyledButton type="primary" style={{ paddingRight: '0', width: '50%' }} onClick={() => navigate('/')}>
          Mua vé khác
        </StyledButton>
      </Row>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 700px;
  background-color: white;
  margin: auto;
  padding-top: 10rem;
`;

const Container = styled.div`
  background-color: #f5f5f5;
  border: 1px solid rgba(151, 151, 151, 0.5);
  border-radius: 8px;
`;

const Field = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const SubTitle = styled(Typography.Text)`
  color: #637280;
`;

const FooterTitle = styled.div`
  font-size: 14px;
`;

const FooterPrice = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const StyledButton = styled(Button)`
  width: 100%;
  border-radius: 24px;
  border: 1px solid #c0c6cc;
  padding-right: 36px;
  margin: 10px 0 50px;
  height: 40px;
  font-size: 16px;
`;

export default TicketPage;
