import React from "react";
import styled from "styled-components";

const ExpandedVideoContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const VideoWrapper = styled.div`
  max-width: 80vw;
  max-height: 80vh;
  overflow: hidden;
`;

const ExpandedVideo = ({ src, type, onClose }) => (
  <ExpandedVideoContainer onClick={onClose}>
    <VideoWrapper onClick={(e) => e.stopPropagation()}>
      <video controls autoPlay style={{ maxWidth: "100%", maxHeight: "100%" }}>
        <source src={src} type={type} />
        Your browser does not support the video tag.
      </video>
    </VideoWrapper>
  </ExpandedVideoContainer>
);

export default ExpandedVideo;
