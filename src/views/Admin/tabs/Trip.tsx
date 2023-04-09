import React, { useState, useEffect } from "react";
import {
  Table,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Select,
  Input,
  Tooltip,
  Popconfirm,
  message,
} from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import { v4 as uuidv4 } from "uuid";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import styled from "styled-components";
import { getLocationData } from "utils/appData";

interface SeflProp {}
enum ICoachModel {
  "GHE" = "GHE",
  "GIUONG_NAM" = "GIUONG_NAM",
  "PHONG_NAM" = "PHONG_NAM",
}
const CoachModelLabel = {
  [ICoachModel.GHE]: "Ghế ngồi",
  [ICoachModel.GIUONG_NAM]: "Giường nằm",
  [ICoachModel.PHONG_NAM]: "Phòng nằm",
};
interface ICoach {
  id: string;
  model: ICoachModel;
  capacity: number; // số ghế
  registrationNumber: string; // biển số xe
}

const updateCoach = async (
  coachId: string,
  dataUpdate: { [key: string]: any }
): Promise<{ [key: string]: any }> => {
  return new Promise((res) => {
    setTimeout(() => {
      res({});
    }, 200);
  });
};

const getListCoach = async (
  startAt: number = 0,
  maxResults = 100
): Promise<ICoach[]> => {
  const listCoach: ICoach[] = [
    {
      id: uuidv4(),
      capacity: 40,
      model: ICoachModel.GIUONG_NAM,
      registrationNumber: "93-F1 12345",
    },
    {
      id: uuidv4(),
      capacity: 16,
      model: ICoachModel.GHE,
      registrationNumber: "59-F1 33214",
    },
    {
      id: uuidv4(),
      capacity: 24,
      model: ICoachModel.PHONG_NAM,
      registrationNumber: "52-S1 67931",
    },
    {
      id: uuidv4(),
      capacity: 40,
      model: ICoachModel.GHE,
      registrationNumber: "24-A1 8652",
    },
  ];
  await delay(500);
  return listCoach;
};

const deleteCoach = async (id: string): Promise<string> => {
  await delay(500);
  return new Promise((res) => {
    res("Delete success!");
  });
};

const createCoach = async (data: ICoach): Promise<ICoach> => {
  // const { capacity, model, registrationNumber } = data;
  return new Promise((res) => {
    res({
      ...data,
      id: uuidv4(),
    });
  });
};

const coachApi = {
  updateCoach,
  getListCoach,
  deleteCoach,
  createCoach,
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
  const [coachList, setCoachList] = useState<ICoach[]>([]);
  const [tableStatus, setTableStatus] = useState<"loading" | "none">("none");
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [highlightType, setHighlightType] = useState<"update" | "delete">(
    "update"
  );
  // Get data after mount
  useEffect(() => {
    // Call api to get coach list, do later
    console.log("get coach list from api");

    // Got data successfully
    setTableStatus("loading");
    getListCoach(0, 100).then((data) => {
      setCoachList(data);
      setTableStatus("none");
    });

    getLocationData().then((res) => {
      console.log(
        "🚀 ~ file: Routes.tsx ~ line 137 ~ getLocationData ~ res",
        res
      );
    });
  }, []);

  // Handle adding coach dialog
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
    const { capacity, model, registrationNumber } = values;
    const id = values.id || uuidv4();
    // Fake call api
    const newCoach: ICoach = {
      id,
      capacity,
      model,
      registrationNumber,
    };
    try {
      const api =
        type === "create"
          ? coachApi.createCoach(newCoach)
          : coachApi.updateCoach(id, { capacity, model, registrationNumber });

      setTableStatus("loading");
      // const res = await api;
      await delay(500);

      let newCoachList: ICoach[] = [];

      console.log(
        "🚀 ~ file: Assets.tsx ~ line 175 ~ onFinish ~ newCoach",
        newCoach
      );
      if (type === "create") newCoachList = [...coachList, newCoach];
      else
        newCoachList = coachList.map((coach) => {
          if (coach.id !== newCoach.id) return coach;
          else
            return {
              ...newCoach,
              id: coach.id,
            };
        });

      console.log(
        "🚀 ~ file: Assets.tsx ~ line 187 ~ onFinish ~ newCoachList",
        newCoachList
      );
      // Update data/ui
      setCoachList(newCoachList);

      message.success(
        type === "create"
          ? "Thêm dữ liệu thành công!"
          : "Chỉnh sửa dữ liệu thành công!"
      );
    } catch (error) {
      message.error("Có lỗi xảy ra, vui lòng thử lại!");
    }
    highlightRows([newCoach.id], "update");
    setTableStatus("none");
    setIsOpenModal(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleDeleteCoach = async (coach: ICoach) => {
    setTableStatus("loading");
    highlightRows([coach.id], "delete");
    try {
      await coachApi.deleteCoach(coach.id);
      message.success(
        `Xóa thành công xe có biển số: ${coach.registrationNumber}`
      );
      const newCoachList = coachList.filter((item) => item.id !== coach.id);
      setCoachList(newCoachList);
    } catch (error) {
      console.log(
        "🚀 ~ file: Assets.tsx ~ line 185 ~ handleDeleteCoach ~ error",
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
  const columns: ColumnsType<ICoach> = [
    {
      title: "Điểm đi",
      dataIndex: "origin",
      key: "id",
      render: (_, coach) => <>{CoachModelLabel[coach.model]}</>,
    },
    {
      title: "Điểm đến",
      dataIndex: "destination",
      key: "id",
    },
    {
      title: "Thời gian di chuyển",
      dataIndex: "registrationNumber",
      key: "id",
      // render: (_) => {},
    },
    {
      title: "Thao tác",
      render: (_, coach) => {
        return (
          <ButtonGroup>
            <Tooltip title="Chỉnh sửa" placement="bottom">
              <Button
                type="link"
                onClick={() => {
                  setModalType("edit");
                  form.setFieldsValue(coach);
                  setIsOpenModal(true);
                }}
              >
                <EditFilled style={{ fontSize: 20, color: "#FFC107" }} />
              </Button>
            </Tooltip>

            <Popconfirm
              placement="top"
              title="Bạn có chắc muốn xóa thông tin xe không?"
              description={`Biển số: ${coach.registrationNumber}`}
              onConfirm={() => handleDeleteCoach(coach)}
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
          >
            <Form
              form={form}
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={(values) => onFinish(values, modalType)}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item name={"id"} label={"coachId"} hidden></Form.Item>
              <Form.Item
                name={"origin"}
                label={"Điểm đi"}
                rules={[{ required: true, message: "Chưa chọn loại xe" }]}
              >
                <Select
                  options={Object.keys(ICoachModel).map((modelKey) => ({
                    label: CoachModelLabel[modelKey as ICoachModel],
                    value: modelKey,
                  }))}
                />
              </Form.Item>
              <Form.Item
                name={"destination"}
                label={"Đích đến"}
                rules={[{ required: true, message: "Chưa nhập biển số xe" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="duration"
                label="Thời gian di chuyển"
                rules={[
                  {
                    required: true,
                    message: "Số lượng chỗ ngồi",
                  },
                ]}
              >
                <Select
                  options={[16, 32, 40].map((value) => ({
                    label: value.toString(),
                    value,
                  }))}
                />
              </Form.Item>
              <Form.Item
                name="price"
                label="Giá vé"
                rules={[
                  {
                    required: true,
                    message: "Số lượng chỗ ngồi",
                  },
                ]}
              >
                <Select
                  options={[16, 32, 40].map((value) => ({
                    label: value.toString(),
                    value,
                  }))}
                />
              </Form.Item>
            </Form>
          </Modal>
        </Row>
        <Row>
          <Col span={24}>
            <CustomAntdTable
              dataSource={coachList}
              columns={columns}
              loading={tableStatus === "loading"}
              rowClassName={(coach: ICoach) =>
                selectedRowKeys.includes(coach.id)
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
