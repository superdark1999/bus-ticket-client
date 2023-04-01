import React, { useState, useTransition } from "react";
import styled from "styled-components";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";


const RegisterForm = styled(Form)`
  width: 100%;
`;

const FormItem = styled(Form.Item)`
  margin-bottom: 22px;
`;

const ButtonWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: end;
  gap: 10px;
`;

interface prop {
  setPhoneNumber: (value: boolean) => void;
  setConfirmCode: (value: boolean) => void;
}


// TODO: Gọi API để kiểm tra số điện thoại hợp lệ, gửi số điện thoại cho confirmComponent
const FormPhoneNumber: React.FC<prop> = ({
  setPhoneNumber,
  setConfirmCode,
}) => {
  const [, startTransition] = useTransition();

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    setPhoneNumber(false);
    setConfirmCode(true);
  };

  const navigate = useNavigate();
  const handleBackClick = () => {
    startTransition(() => {
      navigate("/login");
    });
  };

  return (
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
        <Button type="default" onClick={handleBackClick}>
          Quay lại
        </Button>
        <Button
          type="primary"
          htmlType="submit"
        >
          Xác nhận
        </Button>
      </ButtonWrapper>
    </RegisterForm>
  );
};

export default FormPhoneNumber;
