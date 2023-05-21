import { Button, Row, Divider, Select } from 'antd';
import StepLine from 'components/StepLine';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { LeftOutlined, EnvironmentOutlined, EditOutlined, RightOutlined } from '@ant-design/icons';

const { Option } = Select;

interface Props {
  departure: string;
  destination: string;
  date: string;
  quantity: number;
}

const infoSearch: Props = {
  departure: 'nha trang',
  destination: 'sài gòn',
  date: '20/05/2023',
  quantity: 1,
};

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

const ConfirmingPage: React.FC = () => {
  const navigate = useNavigate();
  const content = 1;

  const [isPick, setIsPick] = useState<boolean>(false);
  useEffect(() => {});
  return (
    <Container>
      <Row style={{ fontSize: '24px', fontWeight: 'bold' }}>XÁC NHẬN LỘ TRÌNH</Row>
      <Row style={{ fontSize: '14px', margin: '8px 0 16px' }}>
        {infoSearch.date} {infoSearch.departure} - {infoSearch.destination}
      </Row>
      <StepLine currentStep={content} />
      <Row>
        <Content>
          <FirstRow>XÁC NHẬN LỘ TRÌNH ĐI</FirstRow>
          <SecondRow>
            props.priceđ
            <Dot />
            props.type
          </SecondRow>
          <RouteContainer>
            <RouterInfo>
              <RouteLine>
                <RouteLineTime>08:00</RouteLineTime>
                <LocationIcon />
                props.departure
                <Distance>Xe tuyến: props.distance = props.duration</Distance>
              </RouteLine>
              <RouteLine>
                <RouteLineTime>20:00</RouteLineTime>
                <LocationIcon />
                props.arrival
              </RouteLine>
            </RouterInfo>
          </RouteContainer>
          <StyledDivider />
          <ContainerChooseSeat>
            <TitleSeat>
              Chon ghế
              <InfoSeat>A16</InfoSeat>
            </TitleSeat>
            <ButtonSeat>
              CHỌN GHẾ <EditOutlined />
            </ButtonSeat>
          </ContainerChooseSeat>
          <StyledDivider />
          <Row style={{ padding: '20px', flexDirection: 'column' }}>
            <Label>Điểm lên xe</Label>
            <Select defaultValue="Chọn điểm lên xe" onChange={() => setIsPick(true)}>
              {options.map((option) => (
                <Option key={option.value} value={option.label}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Row>
        </Content>
      </Row>
      <Row style={{ flexFlow: 'row' }}>
        <StyledButton type="default" style={{ marginRight: '16px' }} onClick={() => navigate(-1)}>
          <LeftOutlined /> Quay lại
        </StyledButton>
        <StyledButton type="primary" style={{ marginLeft: '16px' }} disabled={!isPick} onClick={() => navigate(-1)}>
          Tiếp tục <RightOutlined />
        </StyledButton>
      </Row>
    </Container>
  );
};

const Container = styled.div`
  max-width: 700px;
  background-color: white;
  margin: auto;
`;

const StyledButton = styled(Button)`
  width: 100%;
  border-radius: 24px;
  border: 1px solid #c0c6cc;
  padding-right: 36px;
  margin: 10px 0 50px;
  height: 40px;
`;

const Content = styled.div`
  width: 700px;
  margin: 0 auto 20px;
  border: 1px solid #dde2e8;
  border-radius: 16px;
`;

const FirstRow = styled.div`
  height: 65px;
  padding: 0 20px;
  font-size: 18px;
  font-weight: 600;
  color: #f15a24;
  line-height: 65px;
`;

const SecondRow = styled.div`
  color: #111;
  margin: 0 20px 20px;
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
  padding: 0 20px 20px 68px;
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

const RouteLineTime = styled.span`
  position: absolute;
  left: -52px;
  top: 0;
  font-size: 13px;
  color: #637280;
`;

const StyledDivider = styled(Divider)`
  height: 10px;
  border-top: 1px solid #dde2e8;
  border-bottom: 1px solid #dde2e8;
  background-color: #f7f7f7;
  margin: 0;
`;

const ContainerChooseSeat = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
`;

const TitleSeat = styled.div`
  flex: 1;
  font-size: 13px;
  color: #637280;
`;

const InfoSeat = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #111;
`;

const ButtonSeat = styled.div`
  font-size: 11px;
  font-weight: 700;
  color: #ef5222;
  text-transform: uppercase;
  line-height: 20px;
  cursor: pointer;
`;

const Label = styled.div`
  font-size: 13px;
  color: #637280;
  margin-bottom: 4px;
`;

export default ConfirmingPage;
