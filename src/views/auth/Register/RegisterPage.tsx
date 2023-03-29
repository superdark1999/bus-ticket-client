import React from "react";
import styled from "styled-components";
import { Form, Input, Button } from "antd";
import logo from "../../../logo.svg";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
`;

const Container = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
`;

const Logo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const LogoImage = styled.img`
  width: 50px;
  height: 50px;
`;

const LogoText = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 30px;
`;

const RegisterForm = styled(Form)`
  width: 100%;
`;

const FormItem = styled(Form.Item)`
  margin-bottom: 22px;
`;

const RegisterButton = styled(Button)`
  width: 100%;
`;

const RegisterPage: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Wrapper>
      <Container>
        <Logo>
          <LogoImage src={logo} alt="Bus Ticket" />
          <LogoText>Bus ticket</LogoText>
        </Logo>
        <Title>Đăng ký người dùng mới</Title>
        <RegisterForm onFinish={onFinish}>
          <FormItem
            name="email"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập địa chỉ email của bạn!",
              },
              {
                type: "email",
                message: "Địa chỉ email phải có dạng 'abc@gmail.com'!",
              },
            ]}
          >
            <Input placeholder="Email" />
          </FormItem>
          <FormItem
            name="phone"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số điện thoại của bạn!",
              },
              {
                pattern: /^\d+$/,
                message: "Số điện thoại chỉ chấp nhận nhập số!",
              },
            ]}
          >
            <Input placeholder="Số điện thoại" />
          </FormItem>
          <FormItem
            name="password"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu của bạn!" },
            ]}
          >
            <Input.Password placeholder="Mật khẩu" />
          </FormItem>
          <FormItem
            name="confirm"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Vui lòng xác nhận mật khẩu của bạn!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Hai mật khẩu không khớp với nhau!")
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Nhập lại mật khẩu" />
          </FormItem>
          <FormItem
            name="name"
            rules={[
              { required: true, message: "Vui lòng nhập họ và tên của bạn!" },
            ]}
          >
            <Input placeholder="Họ và tên" />
          </FormItem>
          <FormItem>
            <RegisterButton type="primary" htmlType="submit">
              Đăng ký
            </RegisterButton>
          </FormItem>
        </RegisterForm>
      </Container>
    </Wrapper>
  );
};

export default RegisterPage;
