import React, { useState } from "react";
import styled from "styled-components";
import AdminNavigation, { TabKey } from "components/AdminNavigation";
import AdminHeader from "components/AdminHeader";
import AdminTab from "components/AdminTab";

const MENU_LEFT_WIDTH = "200px";

export default function Admin() {
  const [isNavExpand, setIsNavExpand] = useState<boolean>(true);
  const [tabKey, setTabKey] = useState<TabKey>(TabKey.COACH);
  return (
    <FullScreen>
      <AdminNavigation
        isExpand={isNavExpand}
        setIsExpand={setIsNavExpand}
        setTabKey={setTabKey}
      />
      <Container isNavExpand={isNavExpand}>
        <AdminHeader />
        <AdminTab tabKey={tabKey} />
      </Container>
    </FullScreen>
  );
}
const FullScreen = styled.div`
  /* width: 100vw;
  height: 100vh; */
  display: inline-flex;
  position: relative;
`;

const Container = styled.div`
  transition: width ease 0.2s;
  width: ${(props: { isNavExpand: boolean }) =>
    `calc( 100vw - ${props.isNavExpand ? MENU_LEFT_WIDTH : "80px"} )`};
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
