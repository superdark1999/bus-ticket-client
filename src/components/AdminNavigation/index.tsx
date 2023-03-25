import React from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  CarOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import LogoApp from "components/LogoApp";
import { ItemType } from "antd/es/menu/hooks/useItems";
const { Sider } = Layout;

interface SelfProps {
  isExpand: boolean;
  setIsExpand: React.Dispatch<React.SetStateAction<boolean>>;
  setTabKey: React.Dispatch<React.SetStateAction<TabKey>>;
}

export enum TabKey {
  "DASHBOARD" = "DASHBOARD",
  "USER" = "USER",
  "COACH" = "COACH",
}

const menuItems: ItemType[] = [
  {
    key: TabKey.DASHBOARD,
    icon: <DashboardOutlined />,
    label: "Tổng quan",
  },
  {
    key: TabKey.USER,
    icon: <UserOutlined />,
    label: "Người dùng",
  },
  {
    key: TabKey.COACH,
    icon: <CarOutlined />,
    label: "Xe",
  },
];

const AdminNavigation = ({ isExpand, setIsExpand, setTabKey }: SelfProps) => {
  return (
    <CustomSider
      collapsible
      collapsed={!isExpand}
      onCollapse={(value) => setIsExpand(!value)}
      theme="light"
    >
      <LogoBox>
        <LogoApp
          showLabel={isExpand}
          backgroundColor={isExpand ? undefined : "transparent"}
        />
      </LogoBox>

      <Menu
        theme="light"
        mode="inline"
        multiple={false}
        defaultSelectedKeys={[TabKey.COACH]}
        items={menuItems}
        onSelect={({ key }) => {
          setTabKey(key as TabKey);
        }}
      />
    </CustomSider>
  );
};

const CustomSider = styled(Sider)`
  box-shadow: 1px 0px 2px grey;
`;

const LogoBox = styled.div`
  margin: 8px 16px;
  height: 60px;
`;

export default AdminNavigation;
