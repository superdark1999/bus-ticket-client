import React from "react";
import styled from "styled-components";
import { Avatar } from "antd";

export const HEADER_HEIGHT = "60px";

const ColorList = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae"];
const randomIndex = Math.trunc(Math.random() * ColorList.length);
function AdminHeader() {
  return (
    <Header>
      <div />
      <div>
        <CustomAvatar size={40} color={ColorList[randomIndex]}>
          ADMIN
        </CustomAvatar>
      </div>
    </Header>
  );
}

const CustomAvatar = styled(Avatar)`
  background-color: ${({ color }: { color: string }) => color};
`;

const Header = styled.div`
  width: 100%;
  height: ${HEADER_HEIGHT};
  position: sticky;
  top: 0px;
  box-shadow: 2px 1px 3px grey;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
`;
export default AdminHeader;
