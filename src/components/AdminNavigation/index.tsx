import React, { useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { CarOutlined } from '@ant-design/icons';
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
  // {
  //   key: TabKey.DASHBOARD,
  //   icon: <DashboardOutlined />,
  //   label: 'Tổng quan',
  // },
  // {
  //   key: TabKey.USER,
  //   icon: <UserOutlined />,
  //   label: 'Người dùng',
  // },
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

  const getPath = (key: string): string => {
    switch (key) {
      case TabKey.DASHBOARD:
        return ROUTER_PATH.ADMIN_DASHBOARD;
      case TabKey.TRIP_ROUTES:
        return ROUTER_PATH.ADMIN_TRIP_ROUTES;
      case TabKey.USER:
        return ROUTER_PATH.ADMIN_USER;
      case TabKey.ASSETS:
        return ROUTER_PATH.ADMIN_ASSETS;
      case TabKey.TRIPS:
        return ROUTER_PATH.ADMIN_TRIPS;
      default:
        break;
    }
    return '';
  };

  const getSelectedKeys = (pathName: string): string[] => {
    const itemSelected = menuItems.find((item) => getPath(item?.key?.toString() || '') === pathName);
    if (itemSelected) return [itemSelected.key?.toString() || ''];
    return [];
  };

  useEffect(() => {
    if (location.pathname === '/admin') navigate('/admin/assets');
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
        defaultSelectedKeys={[location.pathname]}
        selectedKeys={getSelectedKeys(location.pathname)}
        items={menuItems}
        onSelect={({ key }) => {
          const path = getPath(key);
          if (path) navigate(path);
        }}
      />
    </CustomSider>
  );
}

export default AdminNavigation;
