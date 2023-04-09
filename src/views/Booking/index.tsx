import React, { useState } from "react";
import { DatePicker, Space } from "antd";
import type { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Cascader,
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

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

const range = (start: number, end: number) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

// eslint-disable-next-line arrow-body-style
const disabledDate: RangePickerProps["disabledDate"] = (current) => {
  // Can not select days before today and today
  return current && current < dayjs().endOf("day");
};

const disabledDateTime = () => ({
  disabledHours: () => range(0, 24).splice(4, 20),
  disabledMinutes: () => range(30, 60),
  disabledSeconds: () => [55, 56],
});

const disabledRangeTime: RangePickerProps["disabledTime"] = (_, type) => {
  if (type === "start") {
    return {
      disabledHours: () => range(0, 60).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  }
  return {
    disabledHours: () => range(0, 60).splice(20, 4),
    disabledMinutes: () => range(0, 31),
    disabledSeconds: () => [55, 56],
  };
};

const onFinish = (values: any) => {
  console.log("Received values:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);

  
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    origin: '${label} is not a valid email!',
    destination: '${label} is not a valid number!',
    date: '${label} is not a valid number!',
    quantity: '${label} is not a valid number!',

  },
  
};


const { Header, Content, Footer, Sider } = Layout;

const items1: MenuProps["items"] = ["HOME", "LOGIN", "REGISTER"].map((key) => ({
  key,
  label: `${key}`,
}));

type SizeType = Parameters<typeof Form>[0]["size"];
const items2: MenuProps["items"] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub_${key}`,
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
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };


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
    <Layout
      style={
        {
          // position: "relative"
        }
      }
    >
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
          initialValues={{ remember: true }}
          onValuesChange={onFormLayoutChange}
          size={componentSize as SizeType}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          validateMessages={validateMessages}
        >
          <Form.Item
            label="Nơi đi"
            name="origin"
            rules={[{ required: true, message: "Vui lòng điền thông tin!" }]}
          >
            <Select
              style={{
                marginLeft: "50px",
              }}
            >
              <Select.Option value="hanoi">HÀ NỘI</Select.Option>
              <Select.Option value="hochiminh">HỒ CHÍ MINH</Select.Option>
              <Select.Option value="danang">ĐÀ NẴNG</Select.Option>
              <Select.Option value="vinh">VINH</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Nơi đến"
            name="destination"
            rules={[{ required: true, message: "Vui lòng điền thông tin!" }]}
          >
            <Select
              style={{
                marginLeft: "50px",
              }}
            >
              <Select.Option value="hanoi">HÀ NỘI</Select.Option>
              <Select.Option value="hochiminh">HỒ CHÍ MINH</Select.Option>
              <Select.Option value="danang">ĐÀ NẴNG</Select.Option>
              <Select.Option value="vinh">VINH</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Ngày"
            name="date"
            rules={[{ required: true, message: "Vui lòng điền thông tin!" }]}
          >
            <DatePicker
              style={{
                marginLeft: "50px",
              }}
              format="YYYY-MM-DD "
              disabledDate={disabledDate}
              disabledTime={disabledDateTime}
              // showTime={{ defaultValue: dayjs("00:00:00", "HH:mm:ss") }}
            />
          </Form.Item>
          <Form.Item
            label="Số lượng"
            style={{
              width: "500px",
            }}
            name="quantity"
            rules={[{ required: true, message: "Vui lòng điền thông tin!" }]}
          >
            <InputNumber
              style={{
                marginLeft: "50px",
              }}
            />
          </Form.Item>
          
            <Form.Item>
              <Button
                style={{
                  marginLeft: "200px",
                  backgroundColor: "orange",
                }}
                type="primary" 
                htmlType="submit"
              >
                TÌM KIẾM
              </Button>
            </Form.Item>
         
        </Form>
      </Content>
      <Footer
        style={{
          textAlign: "center",
          position: "absolute",
          bottom: 0,
          backgroundColor: "black",
          width: "100%",
          right: "0",
          color: "white",
          left: "0",
        }}
      >
        <div>Ant Design ©2023 Created by Ant UED</div>
        {/* <img src="https://cdn-icons-png.flaticon.com/512/4565/4565023.png" alt=""  style={{ width: "100px", height: "100px"}} /> */}
      </Footer>
    </Layout>
  );
};

export default Booking;

