import { Button, Checkbox, Col, Form, Input, Row, Typography } from 'antd';
import StepLine from 'components/StepLine';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router';

export interface InfoCus {
  name: string;
  phone: string;
  email: string;
}

const InputInfoPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  useEffect(() => {});
  const content = 2;
  console.log('🚀 ~ file: InputInfoPage.tsx ~ line 24 ~ onFinish ~ location.state', location.state);

  const onFinish = (values: any) => {
    console.log('inputInfoPage', values, location.state);
    const data = location.state;
    const infoCus: InfoCus = {
      name: values.name,
      phone: values.phone,
      email: values.email,
    };
    if (data) {
      navigate(
        {
          pathname: '/booking/payment',
          search: `${location.search}`,
        },
        {
          state: {
            infoCard: data.infoCard,
            seats: data.seats,
            seatsId: data.seatsId,
            shuttle: data.shuttle,
            infoCus,
          },
        },
      );
    }
  };

  return (
    <Wrapper>
      {/* Title + Step line */}
      <Row style={{ fontSize: '24px', fontWeight: 'bold', margin: 'auto', paddingBottom: '20px', width: '700px' }}>
        THÔNG TIN KHÁCH HÀNG
      </Row>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <StepLine currentStep={content} />
      </div>
      {/* content */}
      <Row gutter={50} style={{ paddingTop: '20px' }}>
        {/* Input info */}
        <Col span={12}>
          <InputContainer>
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <TitleText>THÔNG TIN HÀNH KHÁCH</TitleText>
              <FormItem
                name="name"
                label="Họ tên hành khách"
                rules={[{ required: true, message: 'Vui lòng nhập họ tên hành khách!' }]}
              >
                <Input placeholder="Họ và tên" />
              </FormItem>
              <FormItem
                name="phone"
                label="Số điện thoại"
                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
              >
                <Input placeholder="Nhập số điện thoại" />
              </FormItem>
              <FormItem name="email" label="Email" rules={[{ required: true, message: 'Vui lòng nhập email!' }]}>
                <Input placeholder="Nhập email" />
              </FormItem>

              <FormItem
                name="check"
                valuePropName="checked"
                rules={[
                  {
                    validator: async (_, checked) => {
                      if (!checked) {
                        return Promise.reject(new Error('Vui lòng chấp nhận điều khoản'));
                      }
                      return null;
                    },
                  },
                ]}
              >
                <Checkbox>Chấp nhận điều khoản đặt vé</Checkbox>
              </FormItem>
            </Form>
          </InputContainer>
        </Col>
        {/* Rule */}
        <Col span={12} style={{ borderRadius: '8px', border: '1px solid rgb(220, 225, 230)', marginBottom: '16px' }}>
          <RuleContainer>
            <TitleText>ĐIỀU KHOẢN & LƯU Ý</TitleText>
            <Typography.Paragraph>
              <RequiredMard>*</RequiredMard> Quý khách vui lòng mang mã vé đến văn phòng để đổi vé lên xe trước giờ xuất
              bến ít nhất 60 phút
            </Typography.Paragraph>
            <Typography.Paragraph>
              <RequiredMard>*</RequiredMard> Thông tin hành khách phải chính xác, nếu không sẽ không thể lên xe hoặc
              hủy/đổi vé.
            </Typography.Paragraph>
            <Typography.Paragraph>
              <RequiredMard>*</RequiredMard> Quý khách không được đổi/trả vé vào các ngày Lễ Tết (ngày thường quý khách
              được quyền chuyển đổi hoặc hủy vé duy nhất trước giờ xe chạy 24 giờ), phí hủy vé 10%.
            </Typography.Paragraph>
            <Typography.Paragraph>
              <RequiredMard>*</RequiredMard> Nếu quý khách có cách yêu cầu khác xin vui lòng liên hệ số hotline trước
              khi đặt vé.
            </Typography.Paragraph>
          </RuleContainer>
        </Col>
      </Row>
      <Row style={{ flexFlow: 'row' }}>
        <StyledButton type="default" style={{ marginRight: '16px' }} onClick={() => navigate(-1)}>
          <LeftOutlined /> Quay lại
        </StyledButton>
        <StyledButton type="primary" style={{ marginLeft: '16px' }} onClick={() => form.submit()}>
          Tiếp tục <RightOutlined />
        </StyledButton>
      </Row>
    </Wrapper>
  );
};

const RequiredMard = styled.span`
  color: red;
`;

const Wrapper = styled.div`
  max-width: 936px;
  width: 100vw;
  background-color: white;
  margin: auto;
  padding-top: 10rem;
`;

const InputContainer = styled.div`
  border-radius: 8px;
  border: 1px solid #dce1e6;
  background-color: #f6f6f6;
  margin-bottom: 16px;
`;

const TitleText = styled.div`
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  color: #f15a24;
  margin: 16px;
`;

const StyledButton = styled(Button)`
  width: 100%;
  border-radius: 24px;
  border: 1px solid #c0c6cc;
  padding-right: 36px;
  margin: 10px 0 50px;
  height: 40px;
`;

const FormItem = styled(Form.Item)`
  padding: 0 20px;
`;

const RuleContainer = styled.div``;

export default InputInfoPage;
