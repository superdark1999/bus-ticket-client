import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Form, FormInstance, Input, Select } from "antd";
import {
  ICityLocation,
  IDistrictLocation,
  ILocation,
  IWardsLocation,
  LocationCommon,
} from "utils/appData";
import { v4 } from "uuid";

interface SelfProps {
  formItemProp?: {
    name: string;
    label: string;
  };
  onDataChange?: (location: string) => void;
  form: FormInstance<any>;
}
export const getFormValuesFromData = (fieldName: string, location: string) => {
  const [cityName, districtName, wardName] = location
    .split("-")
    .map((item) => item.trim())
    .filter((item) => !!item)
    .reverse();

  return {
    [`${fieldName}_ward`]: wardName || "",
    [`${fieldName}_district`]: districtName || "",
    [`${fieldName}_city`]: cityName || "",
  };
};
const sortLocation = (data: ILocation[]): ILocation[] => {
  const newData = [...data];
  newData.sort((a, b) => {
    const lastA: string = a?.Name.split(" ")?.at(-1) || "";
    const lastB: string = b?.Name.split(" ")?.at(-1) || "";
    const numA = parseInt(lastA, 10);
    const numB = parseInt(lastB, 10);
    if (!isNaN(numA) && !isNaN(numB)) return numA < numB ? -1 : 1;
    return a.Name.localeCompare(b.Name);
  });
  return newData;
};
const getOption = (
  data: ILocation[] & { [key: string]: any }
): { id: string; label: string; [key: string]: any }[] =>
  data.map((item) => ({
    ...item,
    id: item.Id,
    label: item.Name,
    value: item.Name,
  }));
const SelectLocation = ({ formItemProp, onDataChange, form }: SelfProps) => {
  const [cityData, setCityData] = useState<ICityLocation[]>([]);
  const [districtData, setDistrictData] = useState<IDistrictLocation[]>([]);
  const [wardData, setWardData] = useState<IWardsLocation[]>([]);
  const [districtRefereshKey, setDistrictRefereshKey] = useState(v4());
  const [wardRefereshKey, setWardRefereshKey] = useState(v4());
  const [openMenuSelect, setOpenMenuSelect] = useState<
    "district" | "ward" | null
  >();
  const [locationSelected, setLocationSelected] = useState({
    city: "",
    district: "",
    ward: "",
  });

  useEffect(() => {
    LocationCommon.getLocationData().then((data) => {
      setCityData(sortLocation(data) as ICityLocation[]);
      const defaultLocation: string = form.getFieldValue(
        formItemProp?.name || ""
      );
      if (defaultLocation) {
        const [cityName, districtName, wardName] = defaultLocation
          .split("-")
          .map((item) => item.trim())
          .filter((item) => !!item)
          .reverse();

        const city: ICityLocation | null =
          data.find((item) => item.Name === cityName) || null;
        const district = city?.Districts?.find(
          (item) => item.Name === districtName
        );

        if (city?.Districts) setDistrictData(city?.Districts);
        if (district?.Wards) setWardData(district?.Wards);
      }
    });

    return () => {};
  }, []);

  const handleClearSelect = (clearDistrict: boolean, clearWard: boolean) => {
    if (clearDistrict) {
      setDistrictData([]);
      handleValueChange("city", "");
      handleValueChange("district", "");
      setDistrictRefereshKey(v4());
    }
    if (clearWard) {
      handleValueChange("district", "");
      handleValueChange("ward", "");
      setWardData([]);
      setWardRefereshKey(v4());
    }
  };

  const handleValueChange = (
    locationKey: "city" | "district" | "ward",
    value: string
  ) => {
    const newLocationSelected = { ...locationSelected, [locationKey]: value };
    setLocationSelected(newLocationSelected);
    if (onDataChange) {
      const location = [
        newLocationSelected.ward,
        newLocationSelected.district,
        newLocationSelected.city,
      ]
        .filter((name) => !!name)
        .join(" - ");

      onDataChange(location);
    }
  };

  return (
    <Col>
      {formItemProp && (
        <Form.Item
          label={formItemProp.label}
          style={{ marginBottom: 0 }}
          required
        >
          <Form.Item hidden name={formItemProp.name}>
            <Input />
          </Form.Item>
          <Row>
            <Form.Item
              name={`${formItemProp.name}_city`}
              rules={[
                {
                  required: true,
                  message: `Chưa chọn ${formItemProp.label.toLocaleLowerCase()}`,
                },
              ]}
            >
              <Select
                options={getOption(cityData)}
                allowClear
                placeholder="Chọn tỉnh thành"
                onSelect={(_, option) => {
                  handleValueChange("city", option.label);
                  setOpenMenuSelect("district");
                  setDistrictRefereshKey(v4());
                  setDistrictData(
                    sortLocation(option?.Districts || []) as IDistrictLocation[]
                  );
                }}
                onClear={() => handleClearSelect(true, true)}
                showSearch
              />
            </Form.Item>
            <Form.Item name={`${formItemProp.name}_district`}>
              <Select
                options={getOption(districtData)}
                disabled={!districtData.length}
                autoFocus={!!districtData.length}
                allowClear
                placeholder="Chọn quận huyện"
                defaultOpen={openMenuSelect === "district"}
                key={districtRefereshKey}
                onSelect={(_, option) => {
                  handleValueChange("district", option.label);
                  setOpenMenuSelect("ward");
                  setWardRefereshKey(v4());
                  setWardData(
                    sortLocation(option?.Wards || []) as IWardsLocation[]
                  );
                }}
                onClear={() => handleClearSelect(false, true)}
                showSearch
              />
            </Form.Item>
            <Form.Item name={`${formItemProp.name}_ward`}>
              <Select
                options={getOption(wardData)}
                disabled={!wardData.length}
                allowClear
                autoFocus={!!wardData.length}
                placeholder="Chọn phường xã"
                defaultOpen={openMenuSelect === "ward"}
                key={wardRefereshKey}
                showSearch
                onSelect={(_, option) => {
                  handleValueChange("ward", option.label);
                }}
                onClear={() => handleValueChange("ward", "")}
              />
            </Form.Item>
          </Row>
        </Form.Item>
      )}
    </Col>
  );
};

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: inline-flex;
  gap: 10px;
  width: 100%;
  justify-content: space-between;
  position: relative;
  & > div {
    flex: 1;
  }
`;

export default SelectLocation;
