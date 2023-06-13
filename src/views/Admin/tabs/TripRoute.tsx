import React, { useState, useEffect } from 'react';
import { Table, Row, Col, Button, Modal, Form, Select, DatePicker, message } from 'antd';
import { ColumnsType, TableProps } from 'antd/es/table';
import { useNavigate } from 'react-router';
import dayjs from 'dayjs';
import moment from 'moment';
import { v4 } from 'uuid';
import adminTripApi from 'api/actions/trip';
import adminCoach from 'api/actions/coachAPI';
import adminTripRoute from 'api/actions/tripRouteAPI';
import styled from 'styled-components';
import { ArrowRightOutlined } from '@ant-design/icons';
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

const CustomItemLabel = styled.div`
  display: inline-flex;
  gap: 10px;
  align-items: center;
`;

export type TripRouteData = ITripRoute & ICoach & ITrip;

function sortedTripRouteList(tripRouteList: TripRouteData[]) {
  return tripRouteList.sort((a, b) => {
    const aTime = moment(a.departureTime, 'HH:mm DD/MM/YYYY');
    console.log('🚀 ~ file: TripRoute.tsx:218 ~ sortedTripRouteList ~ aTime:', aTime);
    const bTime = moment(b.departureTime, 'HH:mm DD/MM/YYYY');
    return bTime.diff(aTime);
  });
}

const TripRoute = () => {
  const navigate = useNavigate();
  const [isAddingtripRouteOpen, setIsAddingRripRouteOpen] = useState(false);
  const [tripRouteList, settripRouteList] = useState<TripRouteData[]>([]);
  const [tripList, setTripList] = useState<ITrip[]>([]);
  const [stationList, setStationList] = useState<{ id: string; label: React.ReactNode; info: string }[]>([]);
  const [coachList, setCoachList] = useState<ICoach[]>([]);
  const [registrationList, setRegistrationList] = useState<string[]>([]);

  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [highlightType, setHighlightType] = useState<'update' | 'delete'>('update');

  // Get data after mount
  useEffect(() => {
    // Call api to get tripRoute list, do later
    console.log('get tripRoute list from api');

    // get trip route
    adminTripRoute.getTripRouteList().then((res) => {
      console.log('🚀 ~ file: TripRoute.tsx:199 ~ adminTripRoute.getTripRouteList ~ res:', res);
      settripRouteList(sortedTripRouteList(res));
    });

    // get trip list to select, get 1000 because it maybe include all item
    adminTripApi.getListTrip(1, 1000).then((res) => {
      const { results } = res;
      // split into 2 tables to choose the departure and arrival points
      const trip = results.map(({ origin, destination, id, price }) => ({
        id,
        label: (
          <CustomItemLabel>
            <span>{origin}</span>
            <ArrowRightOutlined />
            <span>{destination}</span>
            <span>{`(${price.toLocaleString()}VNĐ)`}</span>
          </CustomItemLabel>
        ),
        info: `${origin} --> ${destination}`,
      }));
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
  }, []);

  // sort tripRouteList by time

  // Handle adding tripRoute dialog
  const showModal = () => {
    setIsAddingRripRouteOpen(true);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsAddingRripRouteOpen(false);
  };

  const highlightRows = (rowKeys: string[], type: 'update' | 'delete', timeDelay: number | 'none' = 5000) => {
    setSelectedRowKeys(rowKeys);
    setHighlightType(type);
    if (timeDelay !== 'none') {
      setTimeout(() => {
        setSelectedRowKeys([]);
      }, timeDelay);
    }
  };

  // Handle form
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    // Call api to add one schedule bus
    console.log(values);

    // get id trip and coach
    const trip = tripList[stationList.findIndex((station) => station.id === values.trip)];
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
          ...tripList[stationList.findIndex((station) => station.id === values.trip)],
          ...result,
        };
        const newtripRouteList = [tripRoute, ...tripRouteList];
        // Update data/ui
        settripRouteList(sortedTripRouteList(newtripRouteList));
        setIsAddingRripRouteOpen(false);
        message.success('Đã thêm thành công');
        highlightRows([result.id], 'update');
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
    // {
    //   title: 'Tuyến đường',
    //   render: (record) => (
    //     <span>
    //       {record.origin} --{'>'} {record.destination}
    //     </span>
    //   ),
    //   key: 'id',
    // },
    {
      title: 'Điểm đi',
      dataIndex: 'origin',
      key: 'id',
    },
    {
      title: 'Đến đến',
      dataIndex: 'destination',
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
      title: 'Số Khách/Số chỗ',
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
                  placeholder="Điểm Đi --> Điểm đến"
                  options={stationList.map((station) => ({
                    value: station.id,
                    label: station.label,
                    info: station.info,
                  }))}
                  filterSort={(optA, optB) =>
                    (optA?.info || '').toLowerCase().localeCompare((optB?.info || '').toLowerCase())
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
            <CustomAntdTable
              dataSource={tripRouteList}
              columns={columns.map((col) => ({
                ...col,
                onCell: (record: TripRouteData) => ({
                  onClick: () => {
                    navigate(`/admin/coach/${record.id}`, { state: { record, tripList } });
                  },
                }),
              }))}
              rowKey="id"
              rowClassName={(trip: ITrip) => (selectedRowKeys.includes(trip.id) ? `highlight_${highlightType}` : '')}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

const CustomAntdTable: React.FC<TableProps<any>> = styled(Table)`
  .highlight {
    &_update {
      background-color: #91caff69;
    }

    @keyframes analogue {
      0% {
        opacity: 1;
        height: 44px;
        clip-path: inset(0px 0px 0px 0px);
      }
      100% {
        height: 0px;
        clip-path: inset(50% 50% 50% 50%);
      }
    }

    &_delete {
      background-color: #ff000045;
      animation: analogue ease 1.5s;
      height: 0px;
      width: 0px;
      opacity: 0;
    }
  }
`;
export default TripRoute;
