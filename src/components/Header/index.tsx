import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: red;
  width: 100%;
  height: 100px;
`;
const Hone = styled.h1`
  color: blue;
`;
export default function Header() {
  return (
    <Container>
      <Hone>hdfsjdks</Hone>
    </Container>
  );
}
