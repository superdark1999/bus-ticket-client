import { HEADER_HEIGHT } from "components/AdminHeader";
import { TabKey } from "components/AdminNavigation";
import React from "react";
import styled from "styled-components";
import Coach from "./tabs/Coach";
import DashBoard from "./tabs/DashBoard";
import User from "./tabs/User";
interface SelfProps {
  tabKey: TabKey;
}
const AdminTab = ({ tabKey }: SelfProps) => {
  return (
    <Content>
      {tabKey === TabKey.DASHBOARD && <DashBoard />}
      {tabKey === TabKey.USER && <User />}
      {tabKey === TabKey.COACH && <Coach />}
    </Content>
  );
};
const Content = styled.div`
  min-height: calc(100vh - ${HEADER_HEIGHT});
  background-color: aliceblue;
`;
export default AdminTab;
