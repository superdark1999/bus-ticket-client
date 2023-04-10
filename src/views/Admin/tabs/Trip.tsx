import React, { useState, useEffect } from "react";
import {
  Table,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Tooltip,
  Popconfirm,
  message,
  InputNumber,
  TimePicker,
} from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import { v4 as uuidv4 } from "uuid";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import styled from "styled-components";
import SelectLocation, {
  getFormValuesFromData,
} from "components/SelectLocation";
import moment from "moment";

interface SeflProp {}
export interface ITrip {
  id: string;
  origin: string;
  destination: string; // số ghế
  duration: string; // biển số xe
  price: number;
}

const updateTrip = async (
  id: string,
  dataUpdate: { [key: string]: any }
): Promise<{ [key: string]: any }> => {
  return new Promise((res) => {
    setTimeout(() => {
      res({});
    }, 200);
  });
};

const getListTrip = async (
  startAt: number = 0,
  maxResults = 100
): Promise<ITrip[]> => {
  const listtrip: ITrip[] = [
    {
      id: "ba0018dd-46ab-493d-a8a5-8867253cf96e",
      destination: "Thành phố Đà Lạt - Tỉnh Lâm Đồng",
      duration: "07:50",
      origin: "Thành phố Hồ Chí Minh",
      price: 500000,
    },
    {
      id: "d317a26d-ed31-49c0-b444-5da8eaca51ee",
      destination: "Thành phố Nha Trang - Tỉnh Khánh Hòa",
      duration: "12:20",
      origin: "Huyện Hóc Môn - Thành phố Hồ Chí Minh",
      price: 600000,
    },
    {
      id: "cd463b61-8f84-4033-a332-d2bc526f052a",
      destination: "Thành phố Kon Tum - Tỉnh Kon Tum",
      duration: "16:30",
      origin: "Huyện Hóc Môn - Thành phố Hồ Chí Minh",
      price: 750000,
    },
  ];
  await delay(500);
  return listtrip;
};

const deleteTrip = async (id: string): Promise<string> => {
  await delay(500);
  return new Promise((res) => {
    res("Delete success!");
  });
};

const createTrip = async (data: ITrip): Promise<ITrip> => {
  // const { destination,duration,origin,price } = data;
  return new Promise((res) => {
    res({
      ...data,
      id: uuidv4(),
    });
  });
};

const tripApi = {
  updateTrip,
  getListTrip,
  deleteTrip,
  createTrip,
};

const delay = async (ms: number = 500) =>
  new Promise<void>((res) => {
    setTimeout(() => {
      res();
    }, ms);
  });

const Routes = ({}: SeflProp) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalType, setModalType] = useState<"create" | "edit">("create");
  const [tripList, setTripList] = useState<ITrip[]>([]);
  const [tableStatus, setTableStatus] = useState<"loading" | "none">("none");
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [highlightType, setHighlightType] = useState<"update" | "delete">(
    "update"
  );
  // Get data after mount
  useEffect(() => {
    // Call api to get trip list, do later
    console.log("get trip list from api");

    // Got data successfully
    setTableStatus("loading");
    getListTrip(0, 100).then((data) => {
      setTripList(data);
      setTableStatus("none");
    });
  }, []);

  // Handle adding trip dialog
  const showModal = () => {
    setIsOpenModal(true);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsOpenModal(false);
  };

  // Handle form
  const [form] = Form.useForm();

  const onFinish = async (values: any, type: "create" | "edit") => {
    // Call api to add one schedule bus
    console.log("🚀 ~ file: Assets.tsx ~ line 152 ~ onFinish ~ values", values);
    const { price, destination, origin } = values;
    const duration = values.duration.format("HH:mm");
    const id = values?.id || uuidv4();
    // Fake call api
    const newTrip: ITrip = {
      id,
      destination,
      duration,
      origin,
      price,
    };
    console.log("🚀 ~ file: Trip.tsx ~ line 172 ~ onFinish ~ newTrip", newTrip);
    try {
      const api =
        type === "create"
          ? tripApi.createTrip(newTrip)
          : tripApi.updateTrip(id, { destination, duration, origin, price });

      setTableStatus("loading");
      // const res = await api;
      await delay(500);

      let newtripList: ITrip[] = [];

      console.log(
        "🚀 ~ file: Assets.tsx ~ line 175 ~ onFinish ~ newTrip",
        newTrip
      );
      if (type === "create") newtripList = [...tripList, newTrip];
      else
        newtripList = tripList.map((trip) => {
          if (trip.id !== newTrip.id) return trip;
          else
            return {
              ...newTrip,
              id: trip.id,
            };
        });

      console.log(
        "🚀 ~ file: Assets.tsx ~ line 187 ~ onFinish ~ newtripList",
        newtripList
      );
      // Update data/ui
      setTripList(newtripList);

      message.success(
        type === "create"
          ? "Thêm dữ liệu thành công!"
          : "Chỉnh sửa dữ liệu thành công!"
      );
    } catch (error) {
      message.error("Có lỗi xảy ra, vui lòng thử lại!");
    }
    highlightRows([newTrip.id], "update");
    setTableStatus("none");
    setIsOpenModal(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleDeleteTrip = async (trip: ITrip) => {
    setTableStatus("loading");
    highlightRows([trip.id], "delete");
    try {
      await tripApi.deleteTrip(trip.id);
      message.success(`Xóa thành công!`);
      const newtripList = tripList.filter((item) => item.id !== trip.id);
      setTripList(newtripList);
    } catch (error) {
      console.log(
        "🚀 ~ file: Assets.tsx ~ line 185 ~ handleDeleteTrip ~ error",
        error
      );
      message.error(`Có lỗi xảy ra, vui lòng thử lại!`);
    } finally {
      setTableStatus("none");
    }
  };

  const highlightRows = (
    rowKeys: string[],
    type: "update" | "delete",
    timeDelay: number | "none" = 5000
  ) => {
    setSelectedRowKeys(rowKeys);
    setHighlightType(type);
    if (timeDelay !== "none") {
      setTimeout(() => {
        setSelectedRowKeys([]);
      }, timeDelay);
    }
  };

  // Handle table component
  const columns: ColumnsType<ITrip> = [
    {
      title: "Điểm đi",
      dataIndex: "origin",
      key: "id",
      // render: (_, trip) => <>{tripModelLabel[trip.model]}</>,
    },
    {
      title: "Điểm đến",
      dataIndex: "destination",
      key: "id",
    },
    {
      title: "Thời gian di chuyển",
      dataIndex: "duration",
      key: "id",
      render: (_, { duration }) => {
        const [hour, minute] = duration.split(":");
        const minuteMessage = minute !== "00" ? ` ${minute} phút` : "";
        return <>{`${hour} giờ${minuteMessage}`}</>;
      },
    },
    {
      title: "Giá vé",
      dataIndex: "price",
      key: "id",
      render: (_, { price }) => <>{`${price.toLocaleString("vn")} VND`}</>,
    },
    {
      title: "Thao tác",
      render: (_, trip) => {
        return (
          <ButtonGroup>
            <Tooltip title="Chỉnh sửa" placement="bottom">
              <Button
                type="link"
                onClick={() => {
                  setModalType("edit");
                  console.log(
                    "🚀 ~ file: Trip.tsx ~ line 294 ~ Routes ~ trip",
                    trip
                  );
                  const { price, duration, origin, destination, id } = trip;
                  form.setFieldsValue({
                    id,
                    price,
                    duration: moment(duration, "HH:mm"),
                    origin,
                    destination,
                    ...getFormValuesFromData("origin", origin),
                    ...getFormValuesFromData("destination", destination),
                  });
                  setIsOpenModal(true);
                }}
              >
                <EditFilled style={{ fontSize: 20, color: "#FFC107" }} />
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
                  <DeleteFilled style={{ fontSize: 20, color: "#e34724" }} />
                </Button>
              </Tooltip>
            </Popconfirm>
          </ButtonGroup>
        );
      },
    },
  ];

  return (
    <Row style={{ overflow: "auto" }}>
      <Col span={24}>
        <Row justify={"end"}>
          <Button
            type="primary"
            onClick={() => {
              setModalType("create");
              setIsOpenModal(true);
            }}
          >
            Thêm Tuyến Đường
          </Button>
          <Modal
            title={
              modalType === "edit"
                ? "Chỉnh sửa tuyến đường"
                : "Thêm tuyến đường"
            }
            okText={modalType === "edit" ? "Lưu" : "Thêm"}
            cancelText="Hủy"
            open={isOpenModal}
            onOk={handleOk}
            onCancel={handleCancel}
            afterClose={() => {
              if (modalType === "edit") form.resetFields();
              setTableStatus("none");
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
                  <Form.Item name={"id"} label={"tripId"} hidden></Form.Item>
                  <SelectLocation
                    formItemProp={{ name: "origin", label: "Điểm đi" }}
                    onDataChange={(location) =>
                      form.setFieldValue("origin", location)
                    }
                    form={form}
                  />
                  <SelectLocation
                    formItemProp={{ name: "destination", label: "Đích đến" }}
                    onDataChange={(location) =>
                      form.setFieldValue("destination", location)
                    }
                    form={form}
                  />

                  <Form.Item
                    name="duration"
                    label="Thời gian di chuyển"
                    rules={[
                      {
                        type: "object" as const,
                        required: true,
                        message: "Vui lòng tính toán thời gian di chuyển!",
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
                        message: "Chưa nhập giá vé!",
                      },
                    ]}
                  >
                    <InputNumber placeholder="VND"></InputNumber>
                  </Form.Item>
                </>
              )}
            </Form>
          </Modal>
        </Row>
        <Row>
          <Col span={24}>
            <CustomAntdTable
              dataSource={tripList}
              columns={columns}
              loading={tableStatus === "loading"}
              rowClassName={(trip: ITrip) =>
                selectedRowKeys.includes(trip.id)
                  ? `highlight_${highlightType}`
                  : ""
              }
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
const ButtonGroup = styled.div`
  display: inline-flex;
`;
const CustomAntdTable: React.FC<TableProps<any>> = styled(Table)`
  .highlight {
    &_update {
      background-color: #91caff69;
    }
    &_delete {
      background-color: #ff000045;
    }
  }
`;
export default Routes;
