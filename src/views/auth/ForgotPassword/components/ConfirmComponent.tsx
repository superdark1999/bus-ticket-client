import React, { useState } from "react";
import styled from "styled-components";
import { Input, Button, Form, notification } from "antd";
import type { NotificationPlacement } from 'antd/es/notification/interface';

const Text = styled.p`
  font-size: 14px;
`;

const ButtonWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: end;
  gap: 10px;
`;

const RegisterForm = styled(Form)`
  width: 100%;
`;

const FormItem = styled(Form.Item)`
  margin-bottom: 22px;
`;

interface Props {
  phoneNumber: string;
  setConfirmCode: (value: boolean) => void;
  setNewPassword: (value: boolean) => void;
}


// TODO: Gọi API để kiểm tra mã xác nhận chính xác
const VerifyCodeForm: React.FC<Props> = ({
  phoneNumber,
  setConfirmCode,
  setNewPassword,
}) => {

  // TODO: cần kiểm tra thời gian gửi lại sau này.
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement: NotificationPlacement) => {
    api.success({
      message: `Thông báo`,
      description: 'Đã gửi lại mã xác nhận',
      placement,
    });
  };

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    setConfirmCode(false);
    setNewPassword(true);
  };


  return (
    <>
    {contextHolder}
    <RegisterForm onFinish={onFinish}>
      <Text>
        Chúng tôi vừa gửi mã xác nhận tới số điện thoại của quý khách.
      </Text>
      <FormItem
        name="confirmCode"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập mã xác nhận!",
          },
        ]}
      >
        <Input placeholder="Mã xác nhận" />
      </FormItem>
      <ButtonWrapper>
     
        <Button type="link" onClick={() => openNotification('bottomRight')}>
          Gửi lại
        </Button>
        <Button type="primary" htmlType="submit">
          Xác nhận
        </Button>
      </ButtonWrapper>
    </RegisterForm>
    </>
  );
};

export default VerifyCodeForm;


// import React, { useMemo } from 'react';
// import {
//   RadiusBottomleftOutlined,
//   RadiusBottomrightOutlined,
//   RadiusUpleftOutlined,
//   RadiusUprightOutlined,
// } from '@ant-design/icons';
// import { Button, Divider, notification, Space } from 'antd';
// import type { NotificationPlacement } from 'antd/es/notification/interface';

// const Context = React.createContext({ name: 'Default' });

// const App: React.FC = () => {
//   const [api, contextHolder] = notification.useNotification();

//   const openNotification = (placement: NotificationPlacement) => {
//     api.info({
//       message: `Notification ${placement}`,
//       description: <Context.Consumer>{({ name }) => `Hello, ${name}!`}</Context.Consumer>,
//       placement,
//     });
//   };

//   const contextValue = useMemo(() => ({ name: 'Ant Design' }), []);

//   return (
//     <Context.Provider value={contextValue}>
//       {contextHolder}
//       <Space>
//         <Button type="primary" onClick={() => openNotification('topLeft')}>
//           <RadiusUpleftOutlined />
//           topLeft
//         </Button>
//         <Button type="primary" onClick={() => openNotification('topRight')}>
//           <RadiusUprightOutlined />
//           topRight
//         </Button>
//       </Space>
//       <Divider />
//       <Space>
//         <Button type="primary" onClick={() => openNotification('bottomLeft')}>
//           <RadiusBottomleftOutlined />
//           bottomLeft
//         </Button>
//         <Button type="primary" onClick={() => openNotification('bottomRight')}>
//           <RadiusBottomrightOutlined />
//           bottomRight
//         </Button>
//       </Space>
//     </Context.Provider>
//   );
// };

// export default App;
