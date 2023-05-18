import React from 'react';
import styled from 'styled-components';
import { Steps } from 'antd';

const { Step } = Steps;

interface Props {
  currentStep: number;
}

const StepLine: React.FC<Props> = ({ currentStep }) => (
  <Container>
    <StyledSteps current={currentStep} labelPlacement="vertical">
      <Step title="CHỌN TUYẾN" />
      <Step title="XÁC NHẬN LỘ TRÌNH" />
      <Step title="THÔNG TIN HÀNH KHÁCH" />
      <Step title="THANH TOÁN" />
    </StyledSteps>
  </Container>
);

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const StyledSteps = styled(Steps)`
  .ant-steps-item-tail::after {
    height: 3px;
  }

  .ant-steps-item-title {
    font-weight: bold;
    font-size: 14px;
    line-height: 1.5;
  }
`;

export default StepLine;
