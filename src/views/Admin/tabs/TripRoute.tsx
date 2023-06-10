import React, { useState, useEffect } from 'react';
import { Table, Row, Col, Button, Modal, Form, Select, DatePicker } from 'antd';
import { ColumnsType } from 'antd/es/table';
// import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import dayjs from 'dayjs';
import moment from 'moment';
import { v4 } from 'uuid';
import adminTripApi from 'api/actions/trip';
import adminCoach from 'api/actions/coachAPI';
import adminTripRoute from 'api/actions/tripRouteAPI';

import { ITrip } from './Trip';
import { ICoach } from './Assets';

export interface ITripRoute {
  id: string;
  departureTime: string;
  arrivalTime: string;
  bookedSeat: boolean[];
  tripId: string;
  coachId: string;
  // createdAt: string;
  // status: string;
}

// export interface ITripRouteData extends ITripRoute,ItripRoute {
//   origin: string;
//   destination: string;
// }

export type TripRouteData = ITripRoute & ICoach & ITrip;
// interface TripRouteData {
//   id: number;
//   origin: string;
//   destination: string;
//   departureTime: any;
//   registrationNumber: string;
//   capacity: number;
//   status: string;
// }

// Call api to get data later, now mock it
const tripRouteListMock: TripRouteData[] = [
  {
    id: v4(),
    origin: 'Sài Gòn',
    destination: 'Quảng Trị',
    departureTime: '00:00 01/01/2023',
    registrationNumber: '74F1-12345',
    capacity: 40,
    status: 'Đang Chờ',
    ...({} as any),
  },
  {
    id: v4(),
    origin: 'Sài Gòn',
    destination: 'Quảng Trị',
    departureTime: '00:00 01/01/2023',
    registrationNumber: '74F1-12345',
    capacity: 40,
    status: 'Đang Chạy',
  },
  {
    id: 3,
    origin: 'Sài Gòn',
    destination: 'Quảng Trị',
    departureTime: '00:00 01/01/2023',
    registrationNumber: '74F1-12345',
    capacity: 40,
    status: 'Hoàn Thành',
  },
  {
    id: 4,
    origin: 'Sài Gòn',
    destination: 'Quảng Trị',
    departureTime: '00:00 01/01/2023',
    registrationNumber: '74F1-12345',
    capacity: 40,
    status: 'Đã Hủy',
  },
  {
    id: 5,
    origin: 'Sài Gòn',
    destination: 'Quảng Trị',
    departureTime: '00:00 01/01/2023',
    registrationNumber: '74F1-12345',
    capacity: 40,
    status: 'Đang chờ',
  },
  {
    id: 6,
    origin: 'Sài Gòn',
    destination: 'Quảng Trị',
    departureTime: '00:00 01/01/2023',
    registrationNumber: '74F1-12345',
    capacity: 40,
    status: 'Đang Chờ',
  },
  {
    id: 7,
    origin: 'Sài Gòn',
    destination: 'Quảng Trị',
    departureTime: '00:00 01/01/2023',
    registrationNumber: '74F1-12345',
    capacity: 40,
    status: 'Đang Chờ',
  },
  {
    id: 8,
    origin: 'Sài Gòn',
    destination: 'Quảng Trị',
    departureTime: '00:00 01/01/2023',
    registrationNumber: '74F1-12345',
    capacity: 40,
    status: 'Đang Chạy',
  },
  {
    id: 9,
    origin: 'Sài Gòn',
    destination: 'Quảng Trị',
    departureTime: '00:00 01/01/2023',
    registrationNumber: '74F1-12345',
    capacity: 40,
    status: 'Đang Chờ',
  },
  {
    id: 10,
    origin: 'Sài Gòn',
    destination: 'Quảng Trị',
    departureTime: '00:00 01/01/2023',
    registrationNumber: '74F1-12345',
    capacity: 40,
    status: 'Hoàn Thành',
  },
  {
    id: 11,
    origin: 'Sài Gòn',
    destination: 'Quảng Trị',
    departureTime: '00:00 01/01/2023',
    registrationNumber: '74F1-12345',
    capacity: 40,
    status: 'Hoàn Thành',
  },
  {
    id: 12,
    origin: 'Sài Gòn',
    destination: 'Quảng Trị',
    departureTime: '00:00 01/01/2023',
    registrationNumber: '74F1-12345',
    capacity: 40,
    status: 'Hoàn Thành',
  },
  {
    id: 13,
    origin: 'Sài Gòn',
    destination: 'Quảng Trị',
    departureTime: '00:00 01/01/2023',
    registrationNumber: '74F1-12345',
    capacity: 40,
    status: 'Hoàn Thành',
  },
  {
    id: 14,
    origin: 'Sài Gòn',
    destination: 'Quảng Trị',
    departureTime: '00:00 01/01/2023',
    registrationNumber: '74F1-12345',
    capacity: 40,
    status: 'Hoàn Thành',
  },
  {
    id: 15,
    origin: 'Sài Gòn',
    destination: 'Quảng Trị',
    departureTime: '00:00 01/01/2023',
    registrationNumber: '74F1-12345',
    capacity: 40,
    status: 'Hoàn Thành',
  },
];

const TripRoute = () => {
  const navigate = useNavigate();
  const [isAddingtripRouteOpen, setIsAddingtripRouteOpen] = useState(false);
  const [tripRouteList, settripRouteList] = useState<TripRouteData[]>([]);
  const [tripList, setTripList] = useState<ITrip[]>([]);
  const [stationList, setStationList] = useState<string[]>([]);
  const [coachList, setCoachList] = useState<ICoach[]>([]);
  const [registrationList, setRegistrationList] = useState<string[]>([]);

  // Get data after mount
  useEffect(() => {
    // Call api to get tripRoute list, do later
    console.log('get tripRoute list from api');

    // get trip route
    adminTripRoute.getTripRouteList().then((res) => {
      console.log('🚀 ~ file: TripRoute.tsx:199 ~ adminTripRoute.getTripRouteList ~ res:', res);
      settripRouteList(res);
    });

    // get trip list to select, get 1000 because it maybe include all item
    adminTripApi.getListTrip(1, 1000).then((res) => {
      const { results, totalResults } = res;
      // split into 2 tables to choose the departure and arrival points
      const trip = results.map(({ origin, destination }) => `${origin} --> ${destination}`);
      setStationList(trip);
      setTripList(results);
    });
    // get coach list to select
    adminCoach.getCoachList().then((res) => {
      const coach = res.map((e: any) => `${e.registrationNumber}`);
      console.log(coach);
      setCoachList(res);
      setRegistrationList(coach);
    });

    // Got data successfully
    // settripRouteList(tripRouteListMock);
  }, []);

  // Handle adding tripRoute dialog
  const showModal = () => {
    setIsAddingtripRouteOpen(true);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsAddingtripRouteOpen(false);
  };

  // Handle form
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    // Call api to add one schedule bus
    console.log(values);

    // get id trip and coach
    const trip = tripList[stationList.indexOf(values.trip)];
    const coach = coachList[registrationList.indexOf(values.bus)];
    const numberSeat = coachList[registrationList.indexOf(values.bus)].capacity || 0;
    const bookedSeat = new Array(numberSeat);
    for (let i = 0; i < numberSeat; i++) {
      bookedSeat[i] = false;
    }
    // create arrivalTime
    const durationTrip = trip.duration;
    const date = moment(new Date(values.departureTime)).add(durationTrip, 'minute');

    const newtripRoute: ITripRoute = {
      id: v4(),
      departureTime: values.departureTime.format('HH:mm DD/MM/YYYY'),
      arrivalTime: date.format('HH:mm DD/MM/YYYY'),
      bookedSeat,
      tripId: trip.id,
      coachId: coach.id,
    };
    // call API
    await adminTripRoute
      .createTripRoute(newtripRoute)
      .then((result) => {
        const tripRoute: TripRouteData = {
          ...coachList[registrationList.indexOf(values.bus)],
          ...tripList[stationList.indexOf(values.trip)],
          ...result,
        };
        console.log('🚀 ~ file: TripRoute.tsx:272 ~ .then ~ tripRoute:', tripRoute);
        const newtripRouteList = [tripRoute, ...tripRouteList];
        // Update data/ui
        settripRouteList(newtripRouteList as any);
        setIsAddingtripRouteOpen(false);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  // Handle table component
  const columns: ColumnsType<TripRouteData> = [
    {
      title: 'Tuyến đường',
      render: (record) => (
        <span>
          {record.origin} --{'>'} {record.destination}
        </span>
      ),
      key: 'id',
    },
    {
      title: 'Thời gian xuất phát',
      dataIndex: 'departureTime',
      key: 'id',
    },
    {
      title: 'Biển Số',
      dataIndex: 'registrationNumber',
      key: 'id',
    },
    {
      title: 'Số Lượng Khách/Số chỗ',
      render: (record) => (
        <span>
          {record.bookedSeat.filter((item: boolean) => item).length}/{record.capacity}
        </span>
      ),
      key: 'id',
    },
  ];

  return (
    <Row style={{ overflow: 'auto' }}>
      <Col span={24}>
        <Row justify="end">
          <Button type="primary" onClick={showModal}>
            Thêm Chuyến Xe
          </Button>
          <Modal
            title="Thêm Chuyến Xe"
            okText="Thêm"
            cancelText="Hủy"
            open={isAddingtripRouteOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            width={800}
          >
            <Form
              form={form}
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item name="trip" label="Tuyến đường" rules={[{ required: true, message: 'Chưa chọn tuyến đường' }]}>
                <Select
                  showSearch
                  defaultValue="Điểm Đi --> Điểm đến"
                  options={stationList.map((station) => ({
                    value: station,
                    label: station,
                  }))}
                  filterSort={(optA, optB) =>
                    (optA?.label ?? '').toLowerCase().localeCompare((optB?.label ?? '').toLowerCase())
                  }
                />
              </Form.Item>
              <Row>
                <Col span={12}>
                  <Form.Item
                    name="departureTime"
                    label="Thời Điểm Khởi Hành"
                    rules={[
                      {
                        required: true,
                        message: 'Chưa chọn thời điểm khởi hành',
                      },
                    ]}
                  >
                    <DatePicker
                      showTime={{ hideDisabledOptions: true }}
                      showNow={false}
                      format="HH:mm DD/MM/YYYY"
                      disabledDate={(date) => date <= dayjs().startOf('day')}
                      minuteStep={5 as any}
                      style={{ width: '90%' }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="bus" label="Xe Sử Dụng" rules={[{ required: true, message: 'Chưa chọn xe' }]}>
                    <Select
                      showSearch
                      defaultValue="Biển Số"
                      options={registrationList.map((bus) => ({
                        value: bus,
                        label: bus,
                      }))}
                      filterSort={(optA, optB) =>
                        (optA?.label ?? '').toLowerCase().localeCompare((optB?.label ?? '').toLowerCase())
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Modal>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              dataSource={tripRouteList}
              columns={columns.map((col) => ({
                ...col,
                onCell: (record: TripRouteData) => ({
                  onClick: () => {
                    navigate(`/admin/coach/${record.id}`, { state: { record } });
                  },
                }),
              }))}
              rowKey="id"
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
export default TripRoute;
