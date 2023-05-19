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

// cái height làm cho màn hình ko kéo dc nên Minh đã chuyển overflow từ hidden thành auto nhưng làm vậy sẽ ảnh hưởng 
// tới cái header của em không nổi lên dc 
const FullScreenStyled = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: auto;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const LayoutStyled = styled(Layout)`
  width: 100vw;
  height: 100vh;
  background-color: white;
`;
