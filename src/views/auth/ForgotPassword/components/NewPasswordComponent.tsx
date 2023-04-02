import React, { useState, useTransition } from "react";
import styled from "styled-components";
import { Form, Input, Button, notification } from "antd";
import { useNavigate } from "react-router-dom";
import type { NotificationPlacement } from 'antd/es/notification/interface';


const RegisterForm = styled(Form)`
  width: 100%;
`;

const FormItem = styled(Form.Item)`
  margin-bottom: 22px;
`;

const RegisterButton = styled(Button)`
  width: 100%;
`;

// TODO: gửi mật khẩu về BE
const NewPassword: React.FC = () => {
  //Thông báo đổi mật khẩu thành công
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement: NotificationPlacement) => {
    api.success({
      message: `Thông báo`,
      description: 'Đã đổi mật khẩu thành công',
      placement,
      duration: 1.5,
      onClose: () => {
        navigate("/login");
      },
    });
  };

  const [, startTransition] = useTransition();
  const navigate = useNavigate();
  const onFinish = (values: any) => {
   
    console.log("Received values of form: ", values);
     startTransition(() =>  {
      openNotification('bottomRight');
      // navigate("/login");
    });
  };

  return (
    <>
    {contextHolder}
    <RegisterForm onFinish={onFinish}>
      <FormItem
        name="newPassword"
        rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới!" }]}
      >
        <Input.Password placeholder="Mật khẩu mới" />
      </FormItem>
      <FormItem
        name="confirm"
        dependencies={["newPassword"]}
        rules={[
          {
            required: true,
            message: "Vui lòng xác nhận mật khẩu mới của bạn!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("newPassword") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("Hai mật khẩu không khớp với nhau!")
              );
            },
          }),
        ]}
      >
        <Input.Password placeholder="Nhập lại mật khẩu mới" />
      </FormItem>
      <FormItem>
        <RegisterButton type="primary" htmlType="submit">
          Xác nhận
        </RegisterButton>
      </FormItem>
    </RegisterForm>
    </>
  );
};

export default NewPassword;
