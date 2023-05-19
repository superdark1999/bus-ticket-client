import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../../../logo.svg';
import VerifyCodeForm from './components/ConfirmComponent';
import FormPhoneNumber from './components/PhoneNumberComponent';
import NewPassword from './components/NewPasswordComponent';

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

const ForgotPasswordPage: React.FC = () => {
  const [isPhoneNumber, setPhoneNumber] = useState(true);
  const [isConfirmCode, setConfirmCode] = useState(false);
  const [isNewPassword, setNewPassword] = useState(false);

  return (
    <Wrapper>
      <Container>
        <Logo>
          <LogoImage src={logo} alt="Bus Ticket" />
          <LogoText>Bus ticket</LogoText>
        </Logo>
        <Title>Quên mật khẩu</Title>
        {isPhoneNumber ? (
          <FormPhoneNumber setPhoneNumber={setPhoneNumber} setConfirmCode={setConfirmCode} />
        ) : isConfirmCode ? (
          <VerifyCodeForm setConfirmCode={setConfirmCode} setNewPassword={setNewPassword} />
        ) : (
          isNewPassword && <NewPassword />
        )}
      </Container>
    </Wrapper>
  );
};

export default ForgotPasswordPage;
