import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, DatePicker, Form, Input, Modal, Select, Tooltip } from 'antd';
import dayjs from 'dayjs';
import Table, { ColumnsType } from 'antd/es/table';
import { useLocation, useParams, useNavigate } from 'react-router';
import { LeftOutlined } from '@ant-design/icons';
import adminTripRoute from 'api/actions/tripRouteAPI';
import moment from 'moment';
import { TripRouteData } from './TripRoute';
import { ITrip } from './Trip';

interface DetailsProps {
  coachId: string;
}

// interface TripRouteDetail {
//   from: string;
//   to: string;
//   departureTime: any;
//   estimatedTime: any;
//   distance: string;
//   // licensePlate: string;
//   passengerAmount: number;
//   // status: string;
//   ticketPrice: number;
// }

interface InfoCustomer {
  id: number;
  chairNo: string;
  phone: string;
  name: string;
  note: string;
}

// Mock data
// const stationList = ['Sài Gòn', 'Quảng Trị', 'Bình Dương', 'Đồng Nai', 'Vùng Tàu', 'Long An'];
// const statusList = ['Đang Chờ', 'Đang Chạy', 'Đã Hủy', 'Hoàn Thành'];
// const licensePlate = '74F1-12345';
const customerList = [
  {
    id: 1,
    chairNo: 'B6',
    phone: '0987654321',
    name: 'Nguyễn Văn A',
    note: 'Vui lòng trung chuyển tại trường KHTN',
  },
  {
    id: 2,
    chairNo: 'B6',
    phone: '0987654321',
    name: 'Nguyễn Văn A',
    note: 'Vui lòng trung chuyển tại trường KHTN',
  },
  {
    id: 3,
    chairNo: 'B6',
    phone: '0987654321',
    name: 'Nguyễn Văn A',
    note: 'Vui lòng trung chuyển tại trường KHTN',
  },
  {
    id: 4,
    chairNo: 'B6',
    phone: '0987654321',
    name: 'Nguyễn Văn A',
    note: 'Vui lòng trung chuyển tại trường KHTN',
  },
  {
    id: 5,
    chairNo: 'B6',
    phone: '0987654321',
    name: 'Nguyễn Văn A',
    note: 'Vui lòng trung chuyển tại trường KHTN',
  },
  {
    id: 6,
    chairNo: 'B6',
    phone: '0987654321',
    name: 'Nguyễn Văn A',
    note: 'Vui lòng trung chuyển tại trường KHTN',
  },
];

const RouteTripDetails = ({ coachId }: DetailsProps) => {
  const { id } = useParams();
  const location = useLocation();
  const data: TripRouteData = location.state.record;
  const tList: ITrip[] = location.state.tripList;
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [tripRouteDetail, settripRouteDetail] = useState<TripRouteData>(data);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isStatus] = useState(dayjs(tripRouteDetail.departureTime, 'HH:mm DD/MM/YYYY').unix() <= dayjs().unix());

  // Handle form
  const [form] = Form.useForm();

  useEffect(() => {
    // create list to select origin and destination

    console.log('id ', id, coachId);
    console.log('record ', data);
  }, []);

  // Calculate totalAmount
  useEffect(() => {
    setTotalAmount(tripRouteDetail.price * tripRouteDetail.bookedSeat.filter((item: boolean) => item).length);
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.resetFields();
    // form.setFieldsValue(tripRouteDetail);
  };

  const handleSubmit = async (values: any) => {
    console.log(values);
    setIsEditing(false);

    // set arrivalTime
    const durationTrip = tripRouteDetail.duration;
    const date = moment(new Date(values.departureTime)).add(durationTrip, 'minute');
    // set id_trip
    const tripId = tList.filter((value) => `${value.origin} --> ${value.destination}` === values.trip);

    console.log('🚀 ~ file: DetailTripRoute.tsx:135 ~ handleSubmit ~ tripId:', tripId);
    await adminTripRoute
      .updateTripRoute(id || '', {
        trip_id: tripId[0].id,
        departureTime: values.departureTime.format('HH:mm DD/MM/YYYY'),
        arrivalTime: date.format('HH:mm DD/MM/YYYY'),
      })
      .then((res) => {
        const newCoachDetail: TripRouteData = {
          ...tripRouteDetail,
          ...res,
          origin: tripId[0].origin,
          destination: tripId[0].destination,
        };
        settripRouteDetail(newCoachDetail);
        console.log('🚀 ~ file: DetailTripRoute.tsx:149 ~ .then ~ newCoachDetail:', newCoachDetail);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // Handle modal table
  const columns: ColumnsType<InfoCustomer> = [
    {
      title: 'Thứ tự',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Số ghế',
      dataIndex: 'chairNo',
      key: 'id',
    },
    {
      title: 'Tên hành khách',
      dataIndex: 'name',
      key: 'id',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'id',
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      key: 'id',
    },
  ];

  return (
    <Container>
      <Form
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          trip: `${tripRouteDetail.origin} --> ${tripRouteDetail.destination}`,
          departureTime: dayjs(tripRouteDetail.departureTime, 'HH:mm DD/MM/YYYY'),
          estimatedTime: tripRouteDetail.duration,
          model: tripRouteDetail.model,
          status: isStatus ? 'Đã hoàn thành' : 'Đang chờ',
          passengerAmount: tripRouteDetail.bookedSeat.filter((item: boolean) => item).length,
          ticketPrice: tripRouteDetail.price,
        }}
        form={form}
      >
        <InfoWrapper>
          <Title>Thông tin chuyến xe {tripRouteDetail.registrationNumber}</Title>
          {!isEditing ? (
            <Tooltip title={isStatus ? 'Chuyến xe đã hoàn thành' : ''}>
              <Button type="primary" onClick={handleEditClick} disabled={isStatus}>
                Chỉnh sửa
              </Button>
            </Tooltip>
          ) : (
            <WrappButton>
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
              <Button onClick={handleCancel}>Hủy</Button>
            </WrappButton>
          )}
        </InfoWrapper>
        <Separator />

        <Form.Item name="trip" label="Tuyến đường" rules={[{ required: true, message: 'Chưa chọn tuyến đường' }]}>
          <Select
            showSearch
            defaultValue="Điểm Đi --> Điểm đến"
            options={tList.map((trip) => ({
              value: `${trip.origin} --> ${trip.destination}`,
              label: `${trip.origin} --> ${trip.destination}`,
            }))}
            filterSort={(optA, optB) =>
              (optA?.label ?? '').toLowerCase().localeCompare((optB?.label ?? '').toLowerCase())
            }
            disabled={!isEditing}
          />
        </Form.Item>
        <FormContainer>
          {/* <FormItem label="Điểm đi:" name="from" rules={[{ required: true, message: 'Chưa chọn điểm đi' }]}>
            <Select
              showSearch
              options={uniqueStationList.map((station) => ({
                value: station,
                label: station,
              }))}
              filterSort={(optA, optB) =>
                (optA?.label ?? '').toLowerCase().localeCompare((optB?.label ?? '').toLowerCase())
              }
              disabled={!isEditing}
            />
          </FormItem>
          <FormItem label="Điểm đến:" name="to" rules={[{ required: true, message: 'Chưa chọn điểm đến' }]}>
            <Select
              showSearch
              options={uniqueStationList.map((station) => ({
                value: station,
                label: station,
              }))}
              filterSort={(optA, optB) =>
                (optA?.label ?? '').toLowerCase().localeCompare((optB?.label ?? '').toLowerCase())
              }
              disabled={!isEditing}
            />
          </FormItem> */}
          <FormItem
            label="Thời gian xuất phát:"
            name="departureTime"
            rules={[{ required: true, message: 'Chưa chọn thời điểm khởi hành' }]}
          >
            <DatePicker
              showTime={{ hideDisabledOptions: true, minuteStep: 5 }}
              showNow={false}
              format="HH:mm DD/MM/YYYY"
              disabledDate={(date) => date <= dayjs().startOf('day')}
              style={{ width: '100%' }}
              disabled={!isEditing}
            />
          </FormItem>
          <FormItem label="Thời gian dự kiến (phút):" name="estimatedTime">
            <Input disabled />
          </FormItem>
          <FormItem label="Loại xe:" name="model">
            <Input disabled />
          </FormItem>
          <FormItem label="Trạng thái:" name="status" rules={[{ required: true, message: 'Chưa chọn trạng thái ' }]}>
            <Input disabled />
          </FormItem>
          <FormItem label="Số lượng hành khách:" name="passengerAmount">
            <Input disabled type="number" />
          </FormItem>
          <FormItem label="Giá vé (VND):" name="ticketPrice">
            <Input disabled type="number" />
          </FormItem>
          <TotalAmount>Tổng số tiền: {totalAmount}</TotalAmount>
        </FormContainer>
      </Form>
      <ButtonRow>
        <Button type="default" onClick={() => navigate(-1)} style={{ width: '45%' }}>
          <LeftOutlined />
          Quay lại
        </Button>
        <Button type="primary" onClick={() => setIsOpenModal(true)} style={{ width: '45%' }}>
          Danh sách hành khách
        </Button>
      </ButtonRow>

      <Modal
        title={`${tripRouteDetail.registrationNumber} - ${tripRouteDetail.origin} - ${tripRouteDetail.destination} -
         ${tripRouteDetail.departureTime}`}
        open={isOpenModal}
        onCancel={() => setIsOpenModal(false)}
        onOk={() => setIsOpenModal(false)}
        width="80%"
        footer={null}
      >
        <Table dataSource={customerList} columns={columns} />
      </Modal>
    </Container>
  );
};

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
  justify-content: space-around;
  margin-top: 1rem;
`;

export default RouteTripDetails;
