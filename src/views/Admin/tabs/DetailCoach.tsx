import { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import dayjs from "dayjs";
import Table, { ColumnsType } from "antd/es/table";

const Container = styled.div`
  margin-top: 1rem;
`;
const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
`;
const FormContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 3rem;
  margin-top: 2rem;
`;
const FormItem = styled(Form.Item)`
  margin-bottom: 1rem;
`;
const WrappButton = styled.div`
  display: flex;
  gap: 1rem;
`;
const TotalAmount = styled.div`
  font-weight: bold;
`;
const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;
const Separator = styled.hr`
  border: none;
  border-top: 1px solid #ccc;
  margin: 1rem 0;
`;

const ButtonRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 1rem;
`;

interface CoachDetailsProps {
  coachId: string;
}

interface CoachDetail {
  from: string;
  to: string;
  departureTime: any;
  estimatedTime: any;
  distance: string;
  // licensePlate: string;
  passengerAmount: number;
  status: string;
  ticketPrice: number;
}

interface InfoCustomer {
  id: number;
  chairNo: string;
  phone: string;
  name: string;
  note: string;
}

//Mock data
const stationList = [
  "Sài Gòn",
  "Quảng Trị",
  "Bình Dương",
  "Đồng Nai",
  "Vùng Tàu",
  "Long An",
];
const statusList = ["Đang Chờ", "Đang Chạy", "Đã Hủy", "Hoàn Thành"];
const licensePlate = "74F1-12345";
const customerList = [
  {
    id: 1,
    chairNo: "B6",
    phone: "0987654321",
    name: "Nguyễn Văn A",
    note: "Vui lòng trung chuyển tại trường KHTN",
  },
  {
    id: 2,
    chairNo: "B6",
    phone: "0987654321",
    name: "Nguyễn Văn A",
    note: "Vui lòng trung chuyển tại trường KHTN",
  },
  {
    id: 3,
    chairNo: "B6",
    phone: "0987654321",
    name: "Nguyễn Văn A",
    note: "Vui lòng trung chuyển tại trường KHTN",
  },
  {
    id: 4,
    chairNo: "B6",
    phone: "0987654321",
    name: "Nguyễn Văn A",
    note: "Vui lòng trung chuyển tại trường KHTN",
  },
  {
    id: 5,
    chairNo: "B6",
    phone: "0987654321",
    name: "Nguyễn Văn A",
    note: "Vui lòng trung chuyển tại trường KHTN",
  },
  {
    id: 6,
    chairNo: "B6",
    phone: "0987654321",
    name: "Nguyễn Văn A",
    note: "Vui lòng trung chuyển tại trường KHTN",
  },
];

const CoachDetails = ({ coachId }: CoachDetailsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [coachDetail, setCoachDetail] = useState<CoachDetail>({
    from: "",
    to: "",
    departureTime: "",
    estimatedTime: "",
    distance: "",
    status: "",
    passengerAmount: 0,
    ticketPrice: 0,
  });

  const [isOpenModal, setIsOpenModal] = useState(false);

  // Handle form
  const [form] = Form.useForm();

  useEffect(() => {
    //TODO: call API to get coach detail from ID
  }, []);

  // Calculate totalAmount
  useEffect(() => {
    setTotalAmount(coachDetail.ticketPrice * coachDetail.passengerAmount);
  }, [coachDetail.ticketPrice, coachDetail.passengerAmount]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.setFieldsValue(coachDetail);
  };

  const handleSubmit = async (values: any) => {
    console.log(values);
    setIsEditing(false);

    // Handle store new detail
    const newCoachDetail: CoachDetail = {
      from: values.from,
      to: values.to,
      departureTime: values.departureTime,
      estimatedTime: values.estimatedTime,
      distance: values.distance,
      status: values.status,
      passengerAmount: Number(values.passengerAmount),
      ticketPrice: Number(values.ticketPrice),
    };
    setCoachDetail(newCoachDetail);

    // TODO: Call API to store in database
    // try {
    //   const response = await fetch("your-api-url", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(newCoachDetail),
    //   });
    //   const data = await response.json();
    //   console.log(data);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  // Handle modal table
  const columns: ColumnsType<InfoCustomer> = [
    {
      title: "Thứ tự",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Số ghế",
      dataIndex: "chairNo",
      key: "id",
    },
    {
      title: "Tên hành khách",
      dataIndex: "name",
      key: "id",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "id",
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      key: "id",
    },
  ];

  return (
    <Container>
      <Form
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          from: coachDetail.from,
          to: coachDetail.to,
          departureTime: coachDetail.departureTime,
          estimatedTime: coachDetail.estimatedTime,
          distance: coachDetail.distance,
          status: coachDetail.status,
          passengerAmount: coachDetail.passengerAmount,
          ticketPrice: coachDetail.ticketPrice,
        }}
        form={form}
      >
        <InfoWrapper>
          <Title>Thông tin chuyến xe {licensePlate}</Title>
          {!isEditing && (
            <Button type="primary" onClick={handleEditClick}>
              Chỉnh sửa
            </Button>
          )}
          {isEditing && (
            <WrappButton>
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
              <Button onClick={handleCancel}>Hủy</Button>
            </WrappButton>
          )}
        </InfoWrapper>
        <Separator />

        <FormContainer>
          <FormItem label="Điểm đi:" name="from">
            <Select
              showSearch
              defaultValue="Điểm Đi"
              options={stationList.map((station) => ({
                value: station,
                label: station,
              }))}
              filterSort={(optA, optB) =>
                (optA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optB?.label ?? "").toLowerCase())
              }
              disabled={!isEditing}
            />
          </FormItem>
          <FormItem label="Điểm đến:" name="to">
            <Select
              showSearch
              defaultValue="Điểm Đến"
              options={stationList.map((station) => ({
                value: station,
                label: station,
              }))}
              filterSort={(optA, optB) =>
                (optA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optB?.label ?? "").toLowerCase())
              }
              disabled={!isEditing}
            />
          </FormItem>
          <FormItem label="Thời gian xuất phát:" name="departureTime">
            <DatePicker
              showTime={{ hideDisabledOptions: true }}
              showNow={false}
              format="HH:mm DD/MM/YYYY"
              disabledDate={(date) => date <= dayjs().startOf("day")}
              minuteStep={5}
              style={{ width: "100%" }}
              disabled={!isEditing}
            />
          </FormItem>
          <FormItem label="Thời gian dự kiến:" name="estimatedTime">
            <Input disabled={!isEditing} />
          </FormItem>
          <FormItem label="Độ dài quãng đường:" name="distance">
            <Input disabled={!isEditing} />
          </FormItem>
          <FormItem label="Trạng thái:" name="status">
            <Select
              showSearch
              defaultValue="Điểm Đến"
              options={statusList.map((status) => ({
                value: status,
                label: status,
              }))}
              filterSort={(optA, optB) =>
                (optA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optB?.label ?? "").toLowerCase())
              }
              disabled={!isEditing}
            />
          </FormItem>
          <FormItem label="Số lượng hành khách:" name="passengerAmount">
            <Input disabled={!isEditing} type="number" />
          </FormItem>
          <FormItem label="Giá vé:" name="ticketPrice">
            <Input disabled={!isEditing} type="number" />
          </FormItem>
          <TotalAmount>Tổng số tiền: {totalAmount}</TotalAmount>
        </FormContainer>
      </Form>
      <ButtonRow>
        <Button type="default" onClick={() => setIsOpenModal(true)}>
          Danh sách hành khách
        </Button>
      </ButtonRow>
      <Modal
        title={
          licensePlate +
          " - " +
          coachDetail.from +
          " - " +
          coachDetail.to +
          " - " +
          coachDetail.departureTime.format("HH:mm DD/MM/YYYY")
        }
        open={isOpenModal}
        onCancel={() => setIsOpenModal(false)}
        onOk={() => setIsOpenModal(false)}
        width={"80%"}
        footer={null}
      >
        <Table dataSource={customerList} columns={columns} />
      </Modal>
    </Container>
  );
};

export default CoachDetails;
