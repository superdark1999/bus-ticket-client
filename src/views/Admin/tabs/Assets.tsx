import React, { useState, useEffect } from "react";
import {
  Table,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Select,
  DatePicker,
  Input,
  Tooltip,
  Popconfirm,
  message,
} from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import styled from "styled-components";

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

const Coach = ({}: SeflProp) => {
  const [isAddingCoachOpen, setIsAddingCoachOpen] = useState(false);
  const [coachList, setCoachList] = useState<ICoach[]>([]);
  const [tableStatus, setTableStatus] = useState<"loading" | "none">("none");
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
    let newCoach = {
      id: coachList.length + 1,
      from: values.from,
      to: values.to,
      departureTime: values.departureTime.format("HH:mm DD/MM/YYYY"),
      passengerAmount: 0,
      licensePlate: values.bus,
      status: "Đang Chờ",
    };

    console.log(form.getFieldValue("departureTime"));

    let newCoachList = [newCoach, ...coachList];

    // Update data/ui
    // setCoachList(newCoachList);
    setIsAddingCoachOpen(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleDeleteCoach = async (coach: ICoach) => {
    setTableStatus("loading");
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

  // Handle table component
  const columns: ColumnsType<ICoach> = [
    {
      title: "Loại xe",
      dataIndex: "model",
      key: "id",
      render: (_, coach) => <>{CoachModelLabel[coach.model]}</>,
    },
    {
      title: "Số ghế",
      dataIndex: "capacity",
      key: "id",
    },
    {
      title: "Biển Số",
      dataIndex: "registrationNumber",
      key: "id",
    },
    {
      title: "Chỉnh sửa",
      render: (_, coach) => {
        return (
          <ButtonGroup>
            <Tooltip title="Chỉnh sửa" placement="bottom">
              <Button type="link">
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
          <Button type="primary" onClick={showModal}>
            Thêm Xe
          </Button>
          <Modal
            title="Thêm Xe"
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
              <Form.Item
                name={"model"}
                label={"Loại xe"}
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
                name={"registrationNumber"}
                label={"Biển số xe"}
                rules={[{ required: true, message: "Chưa nhập biển số xe" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="capacity"
                label="Số lượng chỗ ngồi"
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
            <Table
              dataSource={coachList}
              columns={columns}
              loading={tableStatus === "loading"}
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
export default Coach;
