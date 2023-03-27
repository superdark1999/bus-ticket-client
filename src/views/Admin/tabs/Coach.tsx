import React from "react";
import { Typography, Table, Tag, Row, Col, Button } from "antd";
import { ColumnsType } from "antd/es/table";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';

interface SeflProp {};
interface CoachRecord {
  id: number,
  from: string,
  to: string,
  departureTime: string,
  licensePlate: string,
  passengerAmount: number,
  status: string
}

const Coach = ({}: SeflProp) => {
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
    },{
      title: 'Số Lượng Khách',
      dataIndex: 'passengerAmount',
      key: 'id',
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'id',
      render: ((_, {status}) => {
        
        let tagStyle = status.toLowerCase() === "đang chờ" ? {color: "default", icon: <ClockCircleOutlined/>}
                  : (status.toLowerCase() === "đang chạy" ? {color: "processing", icon: <SyncOutlined/>}
                  : (status.toLowerCase() === "hoàn thành" ? {color: "success", icon: <CheckCircleOutlined/>}
                  : {color: "error", icon: <CloseCircleOutlined/>}));

        return (<Tag {...tagStyle}>{status}</Tag>);
      })
    },
  ];

  // Call api to get data later, now mock it
  const coachListMock : CoachRecord[] = [
    {
      id: 1,
      from: "Sài Gòn",
      to: "Quảng Trị",
      departureTime: "00:00 01/01/2023",
      licensePlate: "74F1-12345",
      passengerAmount: 40,
      status: "Đang Chờ"
    },
    {
      id: 2,
      from: "Sài Gòn",
      to: "Quảng Trị",
      departureTime: "00:00 01/01/2023",
      licensePlate: "74F1-12345",
      passengerAmount: 40,
      status: "Đang Chạy"
    },
    {
      id: 3,
      from: "Sài Gòn",
      to: "Quảng Trị",
      departureTime: "00:00 01/01/2023",
      licensePlate: "74F1-12345",
      passengerAmount: 40,
      status: "Hoàn Thành"
    },
    {
      id: 4,
      from: "Sài Gòn",
      to: "Quảng Trị",
      departureTime: "00:00 01/01/2023",
      licensePlate: "74F1-12345",
      passengerAmount: 40,
      status: "Đã Hủy"
    },
    {
      id: 5,
      from: "Sài Gòn",
      to: "Quảng Trị",
      departureTime: "00:00 01/01/2023",
      licensePlate: "74F1-12345",
      passengerAmount: 40,
      status: "Đang chờ"
    },
    {
      id: 6,
      from: "Sài Gòn",
      to: "Quảng Trị",
      departureTime: "00:00 01/01/2023",
      licensePlate: "74F1-12345",
      passengerAmount: 40,
      status: "Đang Chờ"
    },
    {
      id: 7,
      from: "Sài Gòn",
      to: "Quảng Trị",
      departureTime: "00:00 01/01/2023",
      licensePlate: "74F1-12345",
      passengerAmount: 40,
      status: "Đang Chờ"
    },
    {
      id: 8,
      from: "Sài Gòn",
      to: "Quảng Trị",
      departureTime: "00:00 01/01/2023",
      licensePlate: "74F1-12345",
      passengerAmount: 40,
      status: "Đang Chạy"
    },
    {
      id: 9,
      from: "Sài Gòn",
      to: "Quảng Trị",
      departureTime: "00:00 01/01/2023",
      licensePlate: "74F1-12345",
      passengerAmount: 40,
      status: "Đang Chờ"
    },
    {
      id: 10,
      from: "Sài Gòn",
      to: "Quảng Trị",
      departureTime: "00:00 01/01/2023",
      licensePlate: "74F1-12345",
      passengerAmount: 40,
      status: "Hoàn Thành"
    },
    {
      id: 11,
      from: "Sài Gòn",
      to: "Quảng Trị",
      departureTime: "00:00 01/01/2023",
      licensePlate: "74F1-12345",
      passengerAmount: 40,
      status: "Hoàn Thành"
    },
    {
      id: 12,
      from: "Sài Gòn",
      to: "Quảng Trị",
      departureTime: "00:00 01/01/2023",
      licensePlate: "74F1-12345",
      passengerAmount: 40,
      status: "Hoàn Thành"
    },
    {
      id: 13,
      from: "Sài Gòn",
      to: "Quảng Trị",
      departureTime: "00:00 01/01/2023",
      licensePlate: "74F1-12345",
      passengerAmount: 40,
      status: "Hoàn Thành"
    },
    {
      id: 14,
      from: "Sài Gòn",
      to: "Quảng Trị",
      departureTime: "00:00 01/01/2023",
      licensePlate: "74F1-12345",
      passengerAmount: 40,
      status: "Hoàn Thành"
    },
    {
      id: 15,
      from: "Sài Gòn",
      to: "Quảng Trị",
      departureTime: "00:00 01/01/2023",
      licensePlate: "74F1-12345",
      passengerAmount: 40,
      status: "Hoàn Thành"
    },
  ]
  return (
    <Row>
      <Col span={24}>
        <Row justify={'end'}>
            <Button type="primary">Thêm Chuyến Xe</Button>
        </Row>
        <Row>
          <Col span={24}>
            <Table dataSource={coachListMock} columns={columns}/>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
export default Coach;
