import React from 'react';
import styled from 'styled-components';
import { Steps } from 'antd';

interface Props {
  currentStep: number;
}

const StepLine: React.FC<Props> = ({ currentStep }) => {
  const steps = [
    {
      title: 'CHỌN TUYẾN',
    },
    {
      title: 'XÁC NHẬN LỘ TRÌNH',
    },
    {
      title: 'THÔNG TIN HÀNH KHÁCH',
    },
    {
      title: 'THANH TOÁN',
    },
  ];
  return (
    <Container>
      <StyledSteps current={currentStep} labelPlacement="vertical" items={steps} />
    </Container>
  );
};

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
