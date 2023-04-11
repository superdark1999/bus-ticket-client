import React from "react";
import styled from "styled-components";

interface SelfProps {
  showLabel: boolean;
  theme?: "light" | "dark";
  backgroundColor?: "transparent" | string;
  logoQuality?: "small" | "medium" | "large";
  onClick?: () => void;
  direction?: "column" | "row";
}
//  https://www.flaticon.com/free-icon/bus_1166035?related_id=1165961&origin=search
const LOGO_URL = {
  small: "/bus64.png",
  medium: "/bus128.png",
  large: "/bus512.png",
  nav: {
    routes: "/icon/routes.svg",
  },
};

const LOGO_BACKGROUND_DEFAULT = "#62a7ed";

function LogoApp(props: SelfProps) {
  const {
    showLabel,
    // theme = "light",
    backgroundColor = LOGO_BACKGROUND_DEFAULT,
    logoQuality = "medium",
    direction = "column",
  } = props;
  return (
    <Box {...{ ...props, direction, backgroundColor }}>
      <img src={LOGO_URL[logoQuality]} alt="logo app" />
      {showLabel && <div>Bus Ticket</div>}
    </Box>
  );
}

const Box = styled.div`
  display: flex;
  flex-direction: ${({ direction }: SelfProps) => direction};
  background-color: ${({ backgroundColor }: SelfProps) => backgroundColor};
  cursor: ${({ onClick }: SelfProps) => (onClick ? "pointer" : "unset")};
  min-height: 32px;
  padding: 8px;
  border-radius: 8px;
  margin: 16px;
  justify-content: center;
  align-items: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  img {
    width: 40px;
    /* height: 32px; */
    object-fit: contain;
  }
`;

export default LogoApp;
