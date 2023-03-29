import React, { useTransition } from "react";
import styled from "styled-components";
import { Form, Input, Button } from "antd";
import logo from "../../../logo.svg";
import { useNavigate } from "react-router-dom";

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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
`;

const AccessButton = styled(Button)`
  margin: 0 20px;
`;


const ForgotPasswordPage: React.FC = () => {
  const [, startTransition] = useTransition();
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  const navigate = useNavigate();
  const handleBackClick = () => {
    startTransition(() => {
      navigate("/login");
    });
  };

  return (
    <Wrapper>
      <Container>
        <Logo>
          <LogoImage src={logo} alt="Bus Ticket" />
          <LogoText>Bus ticket</LogoText>
        </Logo>
        <Title>Quên mật khẩu</Title>
        <RegisterForm onFinish={onFinish}>
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
            <Input placeholder="Số điện thoại đã đăng ký" />
          </FormItem>
          <ButtonWrapper>
            <Button type="default" onClick={handleBackClick} >
              Quay lại
            </Button>
            <AccessButton type="primary" htmlType="submit">
              Xác nhận
            </AccessButton>
          </ButtonWrapper>
        </RegisterForm>
      </Container>
    </Wrapper>
  );
};

export default ForgotPasswordPage;
