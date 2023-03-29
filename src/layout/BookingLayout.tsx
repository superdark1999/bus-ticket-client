import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

export default function BookingLayout() {
  const { Sider, Content } = Layout;

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
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const LayoutStyled = styled(Layout)`
  width: 100vw;
  height: 100vh;
`;
