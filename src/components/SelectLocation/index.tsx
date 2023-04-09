import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Select } from "antd";
import {
  ICityLocation,
  IDistrictLocation,
  IWardsLocation,
  LocationCommon,
} from "utils/appData";
const { Option } = Select;
const getOption = (): Option[] => {};
const SelectLocation = () => {
  const [cityData, setCityData] = useState<ICityLocation[]>([]);
  const [districtData, setDistrictData] = useState<IDistrictLocation[]>([]);
  const [wardData, setWardData] = useState<IWardsLocation[]>([]);
  useEffect(() => {
    LocationCommon.getLocationData().then((data) => {
      console.log(
        "🚀 ~ file: index.tsx ~ line 10 ~ LocationCommon.getLocationData ~ data",
        data
      );
    });
    return () => {};
  }, []);
  return (
    <>
      <Select />
      <Select />
      <Select />
    </>
  );
};
export default SelectLocation;
