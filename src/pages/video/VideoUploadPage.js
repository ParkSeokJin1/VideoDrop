import React, { useState, useEffect } from "react";
import { Typography, Button, Form, message, Input } from "antd";
import Dropzone from "react-dropzone";
import { FaPlus } from "react-icons/fa";
import { TfiHandDrag } from "react-icons/tfi";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import VideoInfoInput from "../../components/VideoInfoInput";
import ExpandedVideo from "../../components/ExpandedVideo";
import useDeviceType from "../../hooks/useDeviceType";
import { GiClick } from "react-icons/gi";

const { Title } = Typography;
const { TextArea } = Input;

const CategoryOptions = [
  { value: 0, label: "Film & Animation" },
  { value: 1, label: "Autos & Vehicles" },
  { value: 2, label: "Music" },
  { value: 3, label: "Pets & Animals" },
  { value: 4, label: "Sports" },
];

const VideoUpLoadPage = () => {
  const device = useDeviceType();

  const [Videos, setVideos] = useState([]);
  const [SubmittedVideos, setSubmittedVideos] = useState([]); // 추가된 상태: 제출된 비디오 정보를 저장합니다.
  const [expandedVideo, setExpandedVideo] = useState(null); // 확대해서 보여줄 비디오
  const [isVideosSubmitted, setIsVideosSubmitted] = useState(true);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  // 카테고리 선택 핸들러
  const handleCategoryClick = (categoryLabel) => {
    setActiveCategory(categoryLabel); // 클릭된 카테고리를 활성화 상태로 설정
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);

  const onDrop = (files) => {
    const newVideos = files.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      preview: URL.createObjectURL(file),
      title: "",
      description: "",
      private: 0,
      category: 0,
    }));
    setVideos([...Videos, ...newVideos]);
    setIsVideosSubmitted(false); // 비디오가 드롭될 때 상태 업데이트
  };

  const handleVideoTitleChange = (index, value) => {
    const updatedVideos = [...Videos];
    updatedVideos[index].title = value;
    setVideos(updatedVideos);
  };

  const handleVideoDescriptionChange = (index, value) => {
    const updatedVideos = [...Videos];
    updatedVideos[index].description = value;
    setVideos(updatedVideos);
  };

  const handleVideoPrivacyChange = (index, value) => {
    const updatedVideos = [...Videos];
    updatedVideos[index].private = value;
    setVideos(updatedVideos);
  };

  const handleVideoCategoryChange = (index, value) => {
    const updatedVideos = [...Videos];
    // 문자열로 전달된 value를 숫자로 변환
    updatedVideos[index].category = parseInt(value, 10);
    setVideos(updatedVideos);
  };

  const handleSubmit = () => {
    // 제출 성공 메시지 표시
    message.success("Videos submitted successfully!");

    setSubmittedVideos((prevSubmittedVideos) => [
      ...prevSubmittedVideos,
      ...Videos.map((video) => ({
        ...video,
        // 카테고리 값이 숫자이므로, 해당 값에 맞는 라벨을 찾아서 추가 정보로 저장

        categoryLabel: CategoryOptions.find(
          (option) => option.value === video.category,
        )?.label,
      })),
    ]);

    setVideos([]); // 업로드된 비디오 목록 초기화
    setIsVideosSubmitted(true); // Submit 버튼 클릭 시 상태 업데이트
  };

  // 카테고리별로 비디오 목록을 그룹화하는 함수
  const groupVideosByCategory = (videos) => {
    return videos.reduce((acc, video) => {
      const categoryLabel =
        CategoryOptions.find((option) => option.value === video.category)
          ?.label || "Unknown";
      if (!acc[categoryLabel]) {
        acc[categoryLabel] = [];
      }
      acc[categoryLabel].push(video);
      return acc;
    }, {});
  };

  // 제출된 비디오 목록을 카테고리별로 그룹화
  const groupedVideos = groupVideosByCategory(SubmittedVideos);

  // 비디오 클릭 핸들러
  const handleVideoClick = (video) => {
    setExpandedVideo(video);
  };

  // 비디오 클릭 시 확대된 비디오를 닫는 함수
  const handleCloseExpandedVideo = (e) => {
    e.stopPropagation(); // 비디오 클릭 시 이벤트 버블링 방지
    setExpandedVideo(null);
  };

  const rowVariants = {
    hidden: (direction) => ({
      x: direction > 0 ? window.outerWidth + 5 : -window.outerWidth - 5,
    }),
    visible: {
      x: 0,
    },
    exit: (direction) => ({
      x: direction < 0 ? window.outerWidth + 5 : -window.outerWidth - 5,
    }),
  };

  return (
    <>
      <PageContainer>
        {/* 확대된 비디오 렌더링 */}
        {expandedVideo && (
          <ExpandedVideo
            src={expandedVideo.preview}
            type={expandedVideo.type}
            onClose={handleCloseExpandedVideo}
          />
        )}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Title style={{ color: "#d81f26" }} level={2}>
            <TfiHandDrag />
            Drop Video
          </Title>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Drop zone */}
          {isVideosSubmitted && (
            <DropzoneOuterContainer>
              <Dropzone onDrop={onDrop} multiple={true} maxSize={10000000000}>
                {({ getRootProps, getInputProps }) => (
                  <StyledDropzone pc={device === "pc"} {...getRootProps()}>
                    <input {...getInputProps()} />
                    <FaPlus size={30} />
                  </StyledDropzone>
                )}
              </Dropzone>
            </DropzoneOuterContainer>
          )}
        </div>

        {!isVideosSubmitted && (
          <VideosCon>
            {Videos.map((video, index) => (
              <VideoInfoInput
                key={index}
                video={video}
                onTitleChange={(e) =>
                  handleVideoTitleChange(index, e.target.value)
                }
                onDescriptionChange={(e) =>
                  handleVideoDescriptionChange(index, e.target.value)
                }
                onPrivacyChange={(value) =>
                  handleVideoPrivacyChange(index, value)
                }
                onCategoryChange={(value) =>
                  handleVideoCategoryChange(index, value)
                }
              />
            ))}
          </VideosCon>
        )}

        {/* 비디오가 드롭되었을 때만 Submit 버튼을 표시 */}
        {Videos.length > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Button
              type="primary"
              onClick={handleSubmit}
              style={{ marginTop: "20px" }}
            >
              Submit All Videos
            </Button>
          </div>
        )}
      </PageContainer>
      <div>
        {/* 카테고리별로 그룹화된 비디오 목록을 렌더링 */}
        {Object.entries(groupedVideos).map(([categoryLabel, videos]) => (
          <div key={categoryLabel} style={{ marginTop: "20px" }}>
            <Title
              onClick={() => handleCategoryClick(categoryLabel)}
              level={4}
              style={{
                color: device === "mobile" ? "white" : "inherit",
                cursor: "pointer",
              }}
            >
              {categoryLabel}
              <GiClick size={30} />
            </Title>
            <div style={{ display: "flex", overflowX: "auto" }}>
              <AnimatePresence
                initial={false}
                custom={index}
                onExitComplete={toggleLeaving}
              >
                {/* activeCategory가 null이거나 현재 카테고리와 일치할 때 비디오 표시 */}
                {(activeCategory === null ||
                  activeCategory === categoryLabel) && (
                  <motion.div
                    key={index}
                    custom={index}
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ type: "tween", duration: 1 }}
                  >
                    <VideosContainer device={device}>
                      {videos.map((video, index) => (
                        <div
                          key={index}
                          style={{
                            marginRight: "20px",
                            display: "inline-block",
                          }}
                        >
                          <video
                            controls
                            onClick={() => handleVideoClick(video)}
                            style={{ width: "100%", maxHeight: "150px" }}
                          >
                            <source src={video.preview} type={video.type} />
                            Your browser does not support the video tag.
                          </video>
                          <div>{video.title}</div>
                        </div>
                      ))}
                    </VideosContainer>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default VideoUpLoadPage;

const DropzoneOuterContainer = styled.div`
  display: flex; // Flexbox 레이아웃 활성화
  justify-content: center; // 가로축에서 중앙 정렬
  // 세로축에서의 높이 설정 및 정렬을 제거
  width: 100%; // 부모 컨테이너의 가로 폭을 100%로 설정
`;

const StyledDropzone = styled.div`
  width: ${(props) =>
    props.pc ? "500px" : "300px"}; // PC 여부에 따라 가로 크기 조정
  height: ${(props) =>
    props.pc ? "300px" : "240px"}; // PC 여부에 따라 세로 크기 조정
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2); // 그림자 추가
`;

const VideosContainer = styled.div`
  display: flex;
  overflow-x: hidden; // 수평 스크롤 비활성화
  overflow-y: hidden; // 수직 스크롤 비활성화, 수직 스크롤 바 제거
  white-space: nowrap;
  & > div {
    flex: 0 0 auto; // 비디오 컨테이너(div)의 크기를 고정
    width: ${(props) =>
      props.device === "mobile" ? "45%" : "300px"}; // 기본 비디오 크기 설정
    margin-right: 20px; // 비디오 간 간격 설정
  }
`;

const PageContainer = styled.div`
  max-width: 700px;
  margin: 2rem auto;
`;

const VideosCon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
