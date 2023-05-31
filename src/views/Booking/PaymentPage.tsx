import { Button, Col, Row, Typography } from 'antd';
import StepLine from 'components/StepLine';
import React, { useState } from 'react';
import styled from 'styled-components';
import { LeftOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router';
import moment from 'moment';
import { InfoCard } from 'components/TripRouteCard/index';
import { InfoSearch } from './BookingPage';
import { InfoCus } from './InputInfoPage';

interface InfoTicket {
  infoSearch: InfoSearch;
  infoCard: InfoCard;
  infoSeat: {
    seats: string[];
    seatsId: number[];
  };
  shuttle: string;
  infoCus: InfoCus;
}

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const content = 3;

  // get data form location
  const searchParams = new URLSearchParams(location.search);
  const data: InfoTicket = {
    infoSearch: {
      departure: searchParams.get('departure') || '',
      destination: searchParams.get('destination') || '',
      date: moment(searchParams.get('date')).format('DD/MM/YYYY') || '',
    },
    infoCard: location.state?.infoCard || '',
    infoSeat: {
      seats: location.state?.seats,
      seatsId: location.state?.seatsId,
    },
    shuttle: location.state?.shuttle,
    infoCus: location.state?.infoCus,
  };
  console.log(data);

  return (
    <Wrapper>
      {/* Title + Step line */}
      <Row style={{ fontSize: '24px', fontWeight: 'bold', margin: 'auto', paddingBottom: '20px', width: '700px' }}>
        THÔNG TIN KHÁCH HÀNG
      </Row>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <StepLine currentStep={content} />
      </div>
      {/* Info buy ticket */}
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
            THÔNG TIN MUA VÉ
          </Typography.Title>
        </Row>
        <Row
          align="middle"
          style={{ height: '38px', paddingLeft: '24px', borderBottom: '0.5px solid rgba(151, 151, 151, 0.5)' }}
        >
          <Typography.Title level={5} style={{ margin: '0' }}>
            Thông tin khách hàng
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
            Thông tin chuyến: {data.infoSearch.departure} - {data.infoSearch.destination}
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
          <Col span={8}>
            <Field>
              <Typography.Text>
                {data.infoCard.departure} - {data.infoCard.arrival}{' '}
              </Typography.Text>
            </Field>
            <Field>
              <Typography.Text>
                {data.infoCard.timeDeparture} {data.infoSearch.date}
              </Typography.Text>
            </Field>
            <Field>
              <Typography.Text>Bến xe phía Nam</Typography.Text>
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
          <Col span={8} style={{ paddingLeft: '24px' }}>
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
      <Row style={{ flexFlow: 'row' }}>
        <StyledButton type="default" style={{ marginRight: '16px' }} onClick={() => navigate(-1)}>
          <LeftOutlined /> Quay lại
        </StyledButton>
        <StyledButton
          type="primary"
          style={{ marginLeft: '16px', paddingRight: '0', backgroundColor: '#00603d', fontWeight: 'bold' }}
          onClick={() => navigate(-1)}
        >
          Thanh toán
        </StyledButton>
      </Row>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 936px;
  width: 100vw;
  background-color: white;
  margin: auto;
  padding-top: 10rem;
`;

const Container = styled.div`
  margin: 20px 0;
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

export default PaymentPage;
