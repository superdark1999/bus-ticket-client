import React, { useState } from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Image,
  Input,
  InputNumber,
  MenuProps,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { NavLink } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

const items1: MenuProps["items"] = ["HOME", "LOGIN", "REGISTER"].map((key) => ({
  key,
  label: ` ${key}`,
}));

type SizeType = Parameters<typeof Form>[0]["size"];
const items2: MenuProps["items"] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,

    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

const Booking: React.FC = () => {
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{
      // position: "relative"
    }}>
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items1}
        />
      </Header>
      <Content
        style={{
          padding: "40px 50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          initialValues={{ size: componentSize }}
          onValuesChange={onFormLayoutChange}
          size={componentSize as SizeType}
          style={{ maxWidth: 600 }}
        >
          <Form.Item label="Nơi đi">
            <Select
              style={{
                marginLeft: "50px",
              }}
            >
              <Select.Option value="1">HÀ NỘI</Select.Option>
              <Select.Option value="2">HỒ CHÍ MINH</Select.Option>
              <Select.Option value="3">ĐÀ NẴNG</Select.Option>
              <Select.Option value="4">VINH</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Nơi đến">
            <Select
              style={{
                marginLeft: "50px",
              }}
            >
              <Select.Option value="1">HÀ NỘI</Select.Option>
              <Select.Option value="2">HỒ CHÍ MINH</Select.Option>
              <Select.Option value="3">ĐÀ NẴNG</Select.Option>
              <Select.Option value="4">VINH</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Ngày">
            <DatePicker
              style={{
                marginLeft: "50px",
              }}
            />
          </Form.Item>
          <Form.Item
            label="Số lượng"
            style={{
              width: "500px",
            }}
          >
            <InputNumber
              style={{
                marginLeft: "50px",
              }}
            />
          </Form.Item>
          <NavLink to={"/"}>

          <Form.Item>
            <Button style={{
                marginLeft: "200px", backgroundColor: "orange", 
              }}>TÌM KIẾM</Button>
          </Form.Item>
          </NavLink>
        </Form>
      </Content>
      <Footer style={{ textAlign: 'center', position: "absolute", bottom: 0, backgroundColor: "black", width: "100%", right: "0", color:"white", left: "0" }}><div>Ant Design ©2023 Created by Ant UED</div>
      {/* <img src="https://cdn-icons-png.flaticon.com/512/4565/4565023.png" alt=""  style={{ width: "100px", height: "100px"}} /> */}
      </Footer>
    </Layout>
  );
};

export default Booking;
