import React, { useState, useEffect } from 'react';
import { Table, Row, Col, Button, Modal, Form, Tooltip, Popconfirm, message, InputNumber, TimePicker } from 'antd';
import { ColumnsType, TablePaginationConfig, TableProps } from 'antd/es/table';
import { v4 as uuidv4, v4 } from 'uuid';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import styled from 'styled-components';
import SelectLocation, { getFormValuesFromData } from 'components/SelectLocation';
import moment from 'moment';
import adminTripApi from 'api/actions/trip';
import { FilterValue } from 'antd/es/table/interface';
import { durationCommon } from 'utils/common';

export interface ITrip {
  id: string;
  origin: string;
  destination: string;
  duration: number;
  price: number;
  createdAt?: string;
  updateAt?: string;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

const PAGE_SIZE = 10;

const Routes = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'edit'>('create');
  const [tripList, setTripList] = useState<ITrip[]>([]);
  const [tableStatus, setTableStatus] = useState<'loading' | 'none'>('none');
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [highlightType, setHighlightType] = useState<'update' | 'delete'>('update');
  const [refreshKey, setRefreshKey] = useState<string>(v4());
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: PAGE_SIZE,
    },
  });

  const fetchData = async (page: number, pageSize: number = PAGE_SIZE) => {
    adminTripApi.getListTrip(page, pageSize).then((res) => {
      const { results, totalResults } = res;
      setTripList(results);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: totalResults,
        },
      });
    });
  };

  // Get data after mount
  useEffect(() => {
    // Call api to get trip list, do later
    console.log('get trip list from api');

    // Got data successfully
    setTableStatus('loading');
    fetchData(0, PAGE_SIZE).finally(() => {
      setTableStatus('none');
    });
  }, []);

  useEffect(() => {
    fetchData(tableParams.pagination?.current || 1);
  }, [JSON.stringify(tableParams), refreshKey]);

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsOpenModal(false);
  };

  // Handle form
  const [form] = Form.useForm();

  const onFinish = async (values: any, type: 'create' | 'edit') => {
    // Call api to add one schedule bus
    const { price, destination, origin } = values;
    const durationStr: string = values.duration?.format('HH:mm');
    const [hourStr, minuteStr] = durationStr.split(':');
    const duration = parseInt(hourStr, 10) * 60 + parseInt(minuteStr, 10);
    const id = values?.id || uuidv4();
    // Fake call api
    const newTrip: ITrip = {
      id,
      destination,
      duration,
      origin,
      price,
    };
    try {
      const api =
        type === 'create'
          ? adminTripApi.createTrip(newTrip)
          : adminTripApi.updateTrip(id, {
              destination,
              duration,
              origin,
              price,
            });

      setTableStatus('loading');
      const res = await api;
      console.log('🚀 ~ file: Trip.tsx ~ line 138 ~ onFinish ~ res', res);
      if (type === 'create') newTrip.id = res?.id || newTrip.id;
      message.success(type === 'create' ? 'Thêm dữ liệu thành công!' : 'Chỉnh sửa dữ liệu thành công!');
    } catch (error) {
      message.error('Có lỗi xảy ra, vui lòng thử lại!');
    }
    highlightRows([newTrip.id], 'update');
    // setTableStatus("none");
    setRefreshKey(v4());
    setIsOpenModal(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleDeleteTrip = async (trip: ITrip) => {
    setTableStatus('loading');
    highlightRows([trip.id], 'delete');
    try {
      await adminTripApi.deleteTrip(trip.id);
      setTimeout(() => {
        message.success(`Xóa thành công!`);
        setRefreshKey(v4());
        setTableStatus('none');
      }, 2000);
    } catch (error) {
      message.error(`Có lỗi xảy ra, vui lòng thử lại!`);
      setTableStatus('none');
    }
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

  const handleTableChange = (
    pagination: any,
    filters: any,
    // sorter: SorterResult<any>
  ) => {
    setTableParams({
      pagination,
      filters,
      // ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setTripList([]);
    }
  };

  // Handle table component
  const columns: ColumnsType<ITrip> = [
    {
      title: 'STT',
      key: 'id',
      align: 'center',
      render: (_, __, index) => (
        <>
          {((tableParams.pagination?.current || 1) - 1) * PAGE_SIZE + index + 1}
          {/* {__.id} */}
        </>
      ),
    },
    {
      title: 'Điểm đi',
      dataIndex: 'origin',
      key: 'id',
    },
    {
      title: 'Điểm đến',
      dataIndex: 'destination',
      key: 'id',
    },
    {
      title: 'Thời gian di chuyển',
      dataIndex: 'duration',
      key: 'id',
      render: (_, { duration }) => durationCommon.convertDurationToString(duration),
    },
    {
      title: 'Giá vé',
      dataIndex: 'price',
      key: 'id',
      render: (_, { price }) => `${price.toLocaleString('vn')} VND`,
    },
    {
      title: 'Thao tác',
      align: 'center',
      render: (_, trip) => (
        <ButtonGroup>
          <Tooltip title="Chỉnh sửa" placement="bottom">
            <Button
              type="link"
              onClick={() => {
                setModalType('edit');
                console.log('🚀 ~ file: Trip.tsx ~ line 294 ~ Routes ~ trip', trip);
                const { price, duration, origin, destination, id } = trip;
                form.setFieldsValue({
                  id,
                  price,
                  duration: moment(durationCommon.convertTimePickerValue(duration), 'HH:mm'),
                  origin,
                  destination,
                  ...getFormValuesFromData('origin', origin),
                  ...getFormValuesFromData('destination', destination),
                });
                setIsOpenModal(true);
              }}
            >
              <EditFilled style={{ fontSize: 20, color: '#FFC107' }} />
            </Button>
          </Tooltip>

          <Popconfirm
            placement="top"
            title="Bạn có chắc muốn xóa chuyến xe không?"
            // description={`Biển số: ${trip.registrationNumber}`}
            onConfirm={() => handleDeleteTrip(trip)}
            okText="Xóa dữ liệu"
            okType="danger"
            cancelText="Hủy thao tác"
          >
            <Tooltip title="Xóa" placement="bottom">
              <Button type="link">
                <DeleteFilled style={{ fontSize: 20, color: '#e34724' }} />
              </Button>
            </Tooltip>
          </Popconfirm>
        </ButtonGroup>
      ),
    },
  ];

  return (
    <Row style={{ overflow: 'auto' }}>
      <Col span={24}>
        <Row justify="end">
          <Button
            type="primary"
            onClick={() => {
              setModalType('create');
              setIsOpenModal(true);
            }}
          >
            Thêm Tuyến Đường
          </Button>
          <Modal
            title={modalType === 'edit' ? 'Chỉnh sửa tuyến đường' : 'Thêm tuyến đường'}
            okText={modalType === 'edit' ? 'Lưu' : 'Thêm'}
            cancelText="Hủy"
            open={isOpenModal}
            onOk={handleOk}
            onCancel={handleCancel}
            afterClose={() => {
              if (modalType === 'edit') form.resetFields();
              setTableStatus('none');
            }}
            width={800}
            destroyOnClose
          >
            <Form
              form={form}
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={(values) => onFinish(values, modalType)}
              onFinishFailed={onFinishFailed}
            >
              {isOpenModal && (
                <>
                  <Form.Item name="id" label="tripId" hidden />
                  <SelectLocation
                    formItemProp={{ name: 'origin', label: 'Điểm đi' }}
                    onDataChange={(location) => form.setFieldValue('origin', location)}
                    form={form}
                  />
                  <SelectLocation
                    formItemProp={{ name: 'destination', label: 'Đích đến' }}
                    onDataChange={(location) => form.setFieldValue('destination', location)}
                    form={form}
                  />

                  <Form.Item
                    name="duration"
                    label="Thời gian di chuyển"
                    rules={[
                      {
                        type: 'object' as const,
                        required: true,
                        message: 'Vui lòng tính toán thời gian di chuyển!',
                      },
                    ]}
                  >
                    <TimePicker
                      placeholder="Giờ:phút"
                      showSecond={false}
                      format="HH:mm"
                      showNow={false}
                      minuteStep={5}
                    />
                  </Form.Item>
                  <Form.Item
                    name="price"
                    label="Giá vé"
                    rules={[
                      {
                        required: true,
                        message: 'Chưa nhập giá vé!',
                      },
                    ]}
                  >
                    <InputNumber placeholder="VND" />
                  </Form.Item>
                </>
              )}
            </Form>
          </Modal>
        </Row>
        <Row>
          <Col span={24}>
            <CustomAntdTable
              key={refreshKey}
              dataSource={tripList}
              pagination={tableParams.pagination}
              columns={columns}
              onChange={(
                tableConfig: TablePaginationConfig,
                filter: Record<string, FilterValue | null>,
                // sorter: SorterResult<any>
                // extra: any
              ) => {
                handleTableChange(tableConfig, filter);
              }}
              loading={tableStatus === 'loading'}
              rowClassName={(trip: ITrip) => (selectedRowKeys.includes(trip.id) ? `highlight_${highlightType}` : '')}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
const ButtonGroup = styled.div`
  display: inline-flex;
  button {
    padding: 4px 8px;
  }
`;
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
export default Routes;
