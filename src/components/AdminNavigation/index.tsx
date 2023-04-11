import React, { useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, CarOutlined, DashboardOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import LogoApp from 'components/LogoApp';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { useNavigate, useLocation } from 'react-router';
import { ROUTER_PATH } from 'routes/routesConfig';
import { ICON_URL } from 'utils/constant';

const { Sider } = Layout;

const CustomSider = styled(Sider)`
  box-shadow: 1px 0px 2px grey;
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: space-between;
`;

const LogoBox = styled.div`
  margin: 8px 16px;
  height: 60px;
`;

const CustomIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const CustomMenu = styled(Menu)`
  svg,
  img {
    width: 18px;
    height: 18px;
    font-size: 18px;
  }
`;

interface SelfProps {
  isExpand: boolean;
  setIsExpand: React.Dispatch<React.SetStateAction<boolean>>;
  // setTabKey: React.Dispatch<React.SetStateAction<TabKey>>;
}

export enum TabKey {
  'DASHBOARD' = 'DASHBOARD',
  'USER' = 'USER',
  'COACH' = 'COACH',
  'ASSETS' = 'ASSETS',
  'TRIPS' = 'TRIPS',
  'TRIP_ROUTES' = 'TRIP_ROUTES',
}

const menuItems: ItemType[] = [
  {
    key: TabKey.DASHBOARD,
    icon: <DashboardOutlined />,
    label: 'Tổng quan',
  },
  {
    key: TabKey.USER,
    icon: <UserOutlined />,
    label: 'Người dùng',
  },
  {
    key: TabKey.ASSETS,
    icon: <CarOutlined />,
    label: 'Tài sản',
  },
  {
    key: TabKey.TRIPS,
    icon: <CustomIcon alt="" src={ICON_URL.nav.routes} />,
    label: 'Tuyến đường',
  },
  {
    key: TabKey.TRIP_ROUTES,
    icon: <CustomIcon alt="" src={ICON_URL.nav.tripRoutes} />,
    label: 'Chuyến xe',
  },
];

function AdminNavigation({ isExpand, setIsExpand }: SelfProps) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log('🚀 ~ file: index.tsx ~ line 51 ~ useEffect ~ location', location);
  }, [location]);

  return (
    <CustomSider collapsible collapsed={!isExpand} onCollapse={(value) => setIsExpand(!value)} theme="light">
      <LogoBox>
        <LogoApp showLabel={isExpand} backgroundColor={isExpand ? undefined : 'transparent'} />
      </LogoBox>

      <CustomMenu
        theme="light"
        mode="inline"
        multiple={false}
        defaultSelectedKeys={[]}
        items={menuItems}
        onSelect={({ key }) => {
          switch (key) {
            case TabKey.DASHBOARD:
              navigate(ROUTER_PATH.ADMIN_DASHBOARD);
              break;
            case TabKey.TRIP_ROUTES:
              navigate(ROUTER_PATH.ADMIN_TRIP_ROUTES);
              break;
            case TabKey.USER:
              navigate(ROUTER_PATH.ADMIN_USER);
              break;
            case TabKey.ASSETS:
              navigate(ROUTER_PATH.ADMIN_ASSETS);
              break;
            case TabKey.TRIPS:
              navigate(ROUTER_PATH.ADMIN_TRIPS);
              break;
            default:
              break;
          }
        }}
      />
    </CustomSider>
  );
}

export default AdminNavigation;
