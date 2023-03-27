import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

export default function BookingLayout() {
  const { Content } = Layout;

  return (
    <FullScreenStyled>
      <Layout>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </FullScreenStyled>
  );
}

const FullScreenStyled = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;
