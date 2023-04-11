import React, { useState } from "react";
import styled from "styled-components";
import AdminNavigation from "components/AdminNavigation";
import AdminHeader, { HEADER_HEIGHT } from "components/AdminHeader";
import { Outlet } from "react-router";
import { Layout } from "antd";

const MENU_LEFT_WIDTH = "200px";

export default function AdminLayout() {
  const [isNavExpand, setIsNavExpand] = useState<boolean>(true);
  return (
    <Layout>
      <FullScreen>
        <AdminNavigation isExpand={isNavExpand} setIsExpand={setIsNavExpand} />
        <Container isNavExpand={isNavExpand}>
          <AdminHeader />
          <Content>
            <Outlet />
          </Content>
        </Container>
      </FullScreen>
    </Layout>
  );
}
const FullScreen = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: inline-flex;
  position: relative;
  .ant-table-cell {
    padding: 6px 8px !important;
    height: 44px;
  }

  .ant-table-wrapper {
    .ant-spin-container {
      opacity: 1;
    }
  }
`;

const Container = styled.div`
  transition: width ease 0.2s;
  width: ${(props: { isNavExpand: boolean }) =>
    `calc( 100vw - ${props.isNavExpand ? MENU_LEFT_WIDTH : "80px"} )`};
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  height: calc(100vh - ${HEADER_HEIGHT});
  background-color: aliceblue;
  display: flex;
  flex-direction: column;
  padding: 5vh;
  overflow: auto;
`;
