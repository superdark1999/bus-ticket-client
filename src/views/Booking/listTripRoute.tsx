import { Col, Row, Select } from 'antd';
import StepLine from 'components/StepLine';
import BookingInfo from 'components/TripRouteCard';
import React from 'react';
import styled from 'styled-components';

const { Option } = Select;

interface Props {
  departure?: string;
  destination?: string;
  date?: string;
}

const ListTripRoute: React.FC<Props> = ({ departure, destination, date }) => {
  const content = 1;
  return (
    <Container>
      <Row style={{ fontSize: '24px', fontWeight: 'bold' }}>
        Nha Trang{departure} - TP.Hồ Chí Minh{destination}{' '}
      </Row>
      <Row style={{ fontSize: '14px', margin: '8px 0 16px' }}>20/4/2023{date}</Row>
      <StepLine currentStep={content} />
      <Row gutter={[16, 16]} style={{ padding: '20px 0 35px' }}>
        <Col span={6}>
          <StyledSelect defaultValue="0">
            <Option value="0">Giá</Option>
            <Option value="asc">Thấp - Cao</Option>
            <Option value="desc">Cao - Thấp</Option>
          </StyledSelect>
        </Col>
        <Col span={6}>
          <StyledSelect defaultValue="0">
            <Option value="0">Loại xe</Option>
            <Option value="402">Ghế</Option>
            <Option value="403">Giường</Option>
            <Option value="1454">Limousine</Option>
          </StyledSelect>
        </Col>
        <Col span={6}>
          <StyledSelect defaultValue="0">
            <Option value="0">Giờ</Option>
            <Option value="1">0h - 6h</Option>
            <Option value="2">6h - 12h</Option>
            <Option value="3">12h - 18h</Option>
            <Option value="4">18h - 24h</Option>
          </StyledSelect>
        </Col>
      </Row>
      <BookingInfo />
    </Container>
  );
};

const Container = styled.div`
  max-width: 700px;
  background-color: white;
  align-self: center;
`;

const StyledSelect = styled(Select)`
  width: 100%;

  .ant-select-selector {
    border-radius: 20px;
    background-color: rgba(99, 114, 128, 0.1) !important;
  }
`;

export default ListTripRoute;
