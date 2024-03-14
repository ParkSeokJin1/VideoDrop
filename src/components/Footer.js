import React from "react";
import styled from "styled-components";
import { FaVideo } from "react-icons/fa";
import { IoIosColorFilter } from "react-icons/io";
import { GrVolumeControl } from "react-icons/gr";
import { Link, useMatch } from "react-router-dom";

// footer 스타일링 fixed 처리
const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-evenly; // 균등하게 공간을 분배
  position: fixed; // 푸터를 화면 하단에 고정
  bottom: 0; // 하단에 붙임
  left: 0; // 왼쪽 정렬
  right: 0; // 오른쪽 정렬
  height: 50px;
  align-items: center;
  background-color: ${(props) => (props.device === "pc" ? "white" : "#1c1c1c")};
  padding: 0 10px; // 좌우 패딩
  color: white;
  z-index: 1000; // 다른 요소들 위에 표시되도록 z-index 설정
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
`;

const IconLabel = styled.span`
  margin-top: 5px; // 아이콘과 텍스트 사이의 간격
  font-size: 12px; // 라벨 텍스트 사이즈
  cursor: pointer;
  color: ${(props) => (props.device === "pc" ? "black" : "white")};
`;

const Footer = ({ device }) => {
  const iconColor = device === "pc" ? "black" : "white";
  const iconSize = device === "pc" ? "30px" : "24px";
  return (
    <FooterContainer device={device}>
      <IconContainer>
        <FaVideo size={iconSize} color={iconColor} />
        <IconLabel device={device}>비디오</IconLabel>
      </IconContainer>
      <IconContainer>
        <GrVolumeControl size={iconSize} color={iconColor} />
        <IconLabel device={device}>조절</IconLabel>
      </IconContainer>
      <IconContainer>
        <IoIosColorFilter size={iconSize} color={iconColor} />
        <IconLabel device={device}>필터</IconLabel>
      </IconContainer>
    </FooterContainer>
  );
};

export default Footer;
