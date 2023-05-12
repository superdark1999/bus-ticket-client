import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

export default function BookingLayout() {
  const { Content } = Layout;

  return (
    <FullScreenStyled>
      <LayoutStyled>
        <Content>
          <Outlet />
        </Content>
      </LayoutStyled>
    </FullScreenStyled>
  );
}

const FullScreenStyled = styled.div`
  width: 100%;
  height: auto;
  overflow: hidden;
`;

const LayoutStyled = styled(Layout)`
  width: 100%;
  height: auto;
`;
