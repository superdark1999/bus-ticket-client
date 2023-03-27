import React, { useState } from "react";
import styled from "styled-components";
import { Form, Input, Button, Row, Col, Divider } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import logo from "../../../logo.svg";

const LoginSpace = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
`;

const Container = styled.div`
  width: 500px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 50px;
  height: 50px;
`;

const Title = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const StyledForm = styled(Form)`
  .ant-form-item {
    margin-bottom: 10px;
  }

  .form-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
`;

const SocialLoginIcons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const SocialButton = styled(Button)`
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 50%;
  background-color: lightgray;
`;


const LoginPage: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <LoginSpace>
      <Container className="minhhere">
        <Logo>
          <LogoImage src={logo} alt="Bus Ticket" />
          Bus ticket
        </Logo>
        <Title>Đăng nhập</Title>
        <StyledForm
          form={form}
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="phone"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
              {
                pattern: /^\d+$/,
                message: "Vui lòng nhập số điện thoại hợp lệ!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Số điện thoại"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Mật khẩu"
            />
          </Form.Item>

          <div className="form-actions">
            <Link to="/forgot-password">Quên mật khẩu</Link>
            <Link to="/register">Đăng ký</Link>
          </div>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Đăng nhập
            </Button>
          </Form.Item>
        </StyledForm>

        <Divider plain>Hoặc đăng nhập với</Divider>

        <SocialLoginIcons>
          <SocialButton type="default" shape="circle">
            GG
          </SocialButton>
          &nbsp;&nbsp;
          <SocialButton type="default" shape="circle">
            SMS
          </SocialButton>
        </SocialLoginIcons>
      </Container>
    </LoginSpace>
  );
};

export default LoginPage;
