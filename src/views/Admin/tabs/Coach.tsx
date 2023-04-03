import React, { useState, useEffect } from 'react';
import { Table, Tag, Row, Col, Button, Modal, Form, Select, DatePicker } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, SyncOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

interface SeflProp {}
interface CoachRecord {
  id: number;
  from: string;
  to: string;
  departureTime: any;
  licensePlate: string;
  passengerAmount: number;
  status: string;
}

// Call api to get data later, now mock it
const coachListMock: CoachRecord[] = [
  {
    id: 1,
    from: 'Sài Gòn',
    to: 'Quảng Trị',
    departureTime: '00:00 01/01/2023',
    licensePlate: '74F1-12345',
    passengerAmount: 40,
    status: 'Đang Chờ',
  },
  {
    id: 2,
    from: 'Sài Gòn',
    to: 'Quảng Trị',
    departureTime: '00:00 01/01/2023',
    licensePlate: '74F1-12345',
    passengerAmount: 40,
    status: 'Đang Chạy',
  },
  {
    id: 3,
    from: 'Sài Gòn',
    to: 'Quảng Trị',
    departureTime: '00:00 01/01/2023',
    licensePlate: '74F1-12345',
    passengerAmount: 40,
    status: 'Hoàn Thành',
  },
  {
    id: 4,
    from: 'Sài Gòn',
    to: 'Quảng Trị',
    departureTime: '00:00 01/01/2023',
    licensePlate: '74F1-12345',
    passengerAmount: 40,
    status: 'Đã Hủy',
  },
  {
    id: 5,
    from: 'Sài Gòn',
    to: 'Quảng Trị',
    departureTime: '00:00 01/01/2023',
    licensePlate: '74F1-12345',
    passengerAmount: 40,
    status: 'Đang chờ',
  },
  {
    id: 6,
    from: 'Sài Gòn',
    to: 'Quảng Trị',
    departureTime: '00:00 01/01/2023',
    licensePlate: '74F1-12345',
    passengerAmount: 40,
    status: 'Đang Chờ',
  },
  {
    id: 7,
    from: 'Sài Gòn',
    to: 'Quảng Trị',
    departureTime: '00:00 01/01/2023',
    licensePlate: '74F1-12345',
    passengerAmount: 40,
    status: 'Đang Chờ',
  },
  {
    id: 8,
    from: 'Sài Gòn',
    to: 'Quảng Trị',
    departureTime: '00:00 01/01/2023',
    licensePlate: '74F1-12345',
    passengerAmount: 40,
    status: 'Đang Chạy',
  },
  {
    id: 9,
    from: 'Sài Gòn',
    to: 'Quảng Trị',
    departureTime: '00:00 01/01/2023',
    licensePlate: '74F1-12345',
    passengerAmount: 40,
    status: 'Đang Chờ',
  },
  {
    id: 10,
    from: 'Sài Gòn',
    to: 'Quảng Trị',
    departureTime: '00:00 01/01/2023',
    licensePlate: '74F1-12345',
    passengerAmount: 40,
    status: 'Hoàn Thành',
  },
  {
    id: 11,
    from: 'Sài Gòn',
    to: 'Quảng Trị',
    departureTime: '00:00 01/01/2023',
    licensePlate: '74F1-12345',
    passengerAmount: 40,
    status: 'Hoàn Thành',
  },
  {
    id: 12,
    from: 'Sài Gòn',
    to: 'Quảng Trị',
    departureTime: '00:00 01/01/2023',
    licensePlate: '74F1-12345',
    passengerAmount: 40,
    status: 'Hoàn Thành',
  },
  {
    id: 13,
    from: 'Sài Gòn',
    to: 'Quảng Trị',
    departureTime: '00:00 01/01/2023',
    licensePlate: '74F1-12345',
    passengerAmount: 40,
    status: 'Hoàn Thành',
  },
  {
    id: 14,
    from: 'Sài Gòn',
    to: 'Quảng Trị',
    departureTime: '00:00 01/01/2023',
    licensePlate: '74F1-12345',
    passengerAmount: 40,
    status: 'Hoàn Thành',
  },
  {
    id: 15,
    from: 'Sài Gòn',
    to: 'Quảng Trị',
    departureTime: '00:00 01/01/2023',
    licensePlate: '74F1-12345',
    passengerAmount: 40,
    status: 'Hoàn Thành',
  },
];

const stationList = ['Sài Gòn', 'Quảng Trị', 'Bình Dương', 'Đồng Nai', 'Vùng Tàu', 'Long An'];
const busList = ['74F1-12345', '74F1-12345', '74F1-12345', '74F1-12345', '74F1-12345'];

const Coach = ({}: SeflProp) => {
  const [isAddingCoachOpen, setIsAddingCoachOpen] = useState(false);
  const [coachList, setCoachList] = useState<CoachRecord[]>([]);

  // Get data after mount
  useEffect(() => {
    // Call api to get coach list, do later
    console.log('get coach list from api');

    // Got data successfully
    setCoachList(coachListMock);
  }, []);

  // Handle adding coach dialog
  const showModal = () => {
    setIsAddingCoachOpen(true);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsAddingCoachOpen(false);
  };

  // Handle form
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    // Call api to add one schedule bus
    console.log(values);

    // Fake call api
    const newCoach = {
      id: coachList.length + 1,
      from: values.from,
      to: values.to,
      departureTime: values.departureTime.format('HH:mm DD/MM/YYYY'),
      passengerAmount: 0,
      licensePlate: values.bus,
      status: 'Đang Chờ',
    };

    console.log(form.getFieldValue('departureTime'));

    const newCoachList = [newCoach, ...coachList];

    // Update data/ui
    setCoachList(newCoachList);
    setIsAddingCoachOpen(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  // Handle table component
  const columns: ColumnsType<CoachRecord> = [
    {
      title: 'Điểm Đi',
      dataIndex: 'from',
      key: 'id',
    },
    {
      title: 'Điểm Đến',
      dataIndex: 'to',
      key: 'id',
    },
    {
      title: 'Khởi Hành',
      dataIndex: 'departureTime',
      key: 'id',
    },
    {
      title: 'Biển Số',
      dataIndex: 'licensePlate',
      key: 'id',
    },
    {
      title: 'Số Lượng Khách',
      dataIndex: 'passengerAmount',
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
            open={isAddingCoachOpen}
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
                  options={stationList.map((station) => ({ value: station, label: station }))}
                  filterSort={(optA, optB) =>
                    (optA?.label ?? '').toLowerCase().localeCompare((optB?.label ?? '').toLowerCase())
                  }
                />
              </Form.Item>
              <Form.Item name="to" label="Điểm Đến" rules={[{ required: true, message: 'Chưa chọn điểm đến' }]}>
                <Select
                  showSearch
                  defaultValue="Điểm Đến"
                  options={stationList.map((station) => ({ value: station, label: station }))}
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
                    rules={[{ required: true, message: 'Chưa chọn thời điểm khởi hành' }]}
                  >
                    <DatePicker
                      showTime={{ hideDisabledOptions: true }}
                      showNow={false}
                      format="HH:mm DD/MM/YYYY"
                      disabledDate={(date) => date <= dayjs().startOf('day')}
                      minuteStep={5}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="bus" label="Xe Sử Dụng" rules={[{ required: true, message: 'Chưa chọn xe' }]}>
                    <Select
                      showSearch
                      defaultValue="Biển Số"
                      options={busList.map((bus) => ({ value: bus, label: bus }))}
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
            <Table dataSource={coachList} columns={columns} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
export default Coach;
