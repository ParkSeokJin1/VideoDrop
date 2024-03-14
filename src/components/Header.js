import React from "react";
import styled from "styled-components";
import useDeviceType from "../hooks/useDeviceType";
import { motion, useAnimation } from "framer-motion";
import { Link, useMatch } from "react-router-dom";
import Logo from "./Logo";

const HeaderContainer = styled.header`
  display: flex;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px; // 여백 설정
  background-color: ${(props) =>
    props.device === "mobile" ? "#1c1c1c" : "#ffffff"};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // 상단에 그림자 효과
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  margin-right: 20px;
  color: ${(props) =>
    props.device === "pc" ? "grey" : props.theme.white.darker};
  position: relative;
  text-decoration: none;
  transition: color 0.3s ease-in-out;

  a {
    color: inherit;
    text-decoration: none;
  }

  &:hover {
    color: ${(props) => props.theme.white.lighter};

    a {
      color: inherit;
    }
  }
`;

const Circle = styled(motion.span)`
  border-radius: 5px;
  position: absolute;
  width: 5px;
  height: 5px;
  bottom: -10px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: red;
`;

const Header = () => {
  const device = useDeviceType();
  const VideoMatch = useMatch("/");
  const VideoDropMatch = useMatch("/video");
  const ImageMatch = useMatch("/image");
  return (
    <HeaderContainer device={device}>
      <Logo />
      <Items>
        <Item device={device}>
          <Link to="/">Video {VideoMatch && <Circle layoutId="circle" />}</Link>
        </Item>
        <Item device={device}>
          <Link to="/video">
            DropCategory
            {VideoDropMatch && <Circle layoutId="circle" />}
          </Link>
        </Item>
        <Item device={device}>
          <Link to="/image">
            Image
            {ImageMatch && <Circle layoutId="circle" />}
          </Link>
        </Item>
      </Items>
    </HeaderContainer>
  );
};

export default Header;
