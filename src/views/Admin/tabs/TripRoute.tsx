import React, { useState, useEffect } from 'react';
import { Table, Tag, Row, Col, Button, Modal, Form, Select, DatePicker } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, SyncOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { v4 } from 'uuid';
import { ITrip } from './Trip';
import { ICoach } from './Assets';

export interface ITripRoute {
  id: string;
  departureTime: string;
  arrivalTime: string;
  bookedSeat: boolean[];
  tripId: string;
  tripRouteId: string;
  createdAt: string;
  status: string;
}

// export interface ITripRouteData extends ITripRoute,ItripRoute {
//   origin: string;
//   destination: string;
// }

type TripRouteData = ITripRoute & ICoach & ITrip;
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

const stationList = ['Sài Gòn', 'Quảng Trị', 'Bình Dương', 'Đồng Nai', 'Vùng Tàu', 'Long An'];
const busList = ['74F1-12345', '74F1-12345', '74F1-12345', '74F1-12345', '74F1-12345'];

const TripRoute = () => {
  const [isAddingtripRouteOpen, setIsAddingtripRouteOpen] = useState(false);
  const [tripRouteList, settripRouteList] = useState<TripRouteData[]>([]);

  // Get data after mount
  useEffect(() => {
    // Call api to get tripRoute list, do later
    console.log('get tripRoute list from api');

    // Got data successfully
    settripRouteList(tripRouteListMock);
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

  const onFinish = (values: any) => {
    // Call api to add one schedule bus
    console.log(values);

    // Fake call api
    const newtripRoute = {
      id: tripRouteList.length + 1,
      origin: values.from,
      destination: values.to,
      departureTime: values.departureTime.format('HH:mm DD/MM/YYYY'),
      capacity: 0,
      registrationNumber: values.bus,
      status: 'Đang Chờ',
    };

    console.log(form.getFieldValue('departureTime'));

    const newtripRouteList = [newtripRoute, ...tripRouteList];

    // Update data/ui
    settripRouteList(newtripRouteList as any);
    setIsAddingtripRouteOpen(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  // Handle table component
  const columns: ColumnsType<TripRouteData> = [
    {
      title: 'Điểm Đi',
      dataIndex: 'origin',
      key: 'id',
    },
    {
      title: 'Điểm Đến',
      dataIndex: 'destination',
      key: 'id',
    },
    {
      title: 'Thời lượng chuyến đi',
      dataIndex: 'duration',
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
      title: 'Số Lượng Khách',
      dataIndex: 'capacity',
      key: 'id',
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'id',
      render: (_, { status }) => {
        const tagStyle =
          status.toLowerCase() === 'đang chờ'
            ? { color: 'default', icon: <ClockCircleOutlined /> }
            : status.toLowerCase() === 'đang chạy'
            ? { color: 'processing', icon: <SyncOutlined /> }
            : status.toLowerCase() === 'hoàn thành'
            ? { color: 'success', icon: <CheckCircleOutlined /> }
            : { color: 'error', icon: <CloseCircleOutlined /> };

        return <Tag {...tagStyle}>{status}</Tag>;
      },
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
          >
            <Form
              form={form}
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item name="from" label="Điểm Đi" rules={[{ required: true, message: 'Chưa chọn điểm đi' }]}>
                <Select
                  showSearch
                  defaultValue="Điểm Đi"
                  options={stationList.map((station) => ({
                    value: station,
                    label: station,
                  }))}
                  filterSort={(optA, optB) =>
                    (optA?.label ?? '').toLowerCase().localeCompare((optB?.label ?? '').toLowerCase())
                  }
                />
              </Form.Item>
              <Form.Item name="to" label="Điểm Đến" rules={[{ required: true, message: 'Chưa chọn điểm đến' }]}>
                <Select
                  showSearch
                  defaultValue="Điểm Đến"
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
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="bus" label="Xe Sử Dụng" rules={[{ required: true, message: 'Chưa chọn xe' }]}>
                    <Select
                      showSearch
                      defaultValue="Biển Số"
                      options={busList.map((bus) => ({
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
            <Table dataSource={tripRouteList} columns={columns} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
export default TripRoute;
