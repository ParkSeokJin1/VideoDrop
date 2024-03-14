import React from "react";
import { Input, Select } from "antd";

const { TextArea } = Input;
const PrivateOption = [
  { value: 0, label: "Private" },
  { value: 1, label: "Public" },
];

const CategoryOptions = [
  { value: 0, label: "Film & Animation" },
  { value: 1, label: "Autos & Vehicles" },
  { value: 2, label: "Music" },
  { value: 3, label: "Pets & Animals" },
  { value: 4, label: "Sports" },
];

const VideoInfoInput = ({
  video,
  onTitleChange,
  onDescriptionChange,
  onPrivacyChange,
  onCategoryChange,
}) => {
  return (
    <div
      style={{
        marginBottom: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "50%",
      }}
    >
      <video controls style={{ width: "100%", maxHeight: "300px" }}>
        <source src={video.preview} type={video.type} />
        Your browser does not support the video tag.
      </video>
      <div>Filename: {video.name}</div>
      <Input placeholder="Title" value={video.title} onChange={onTitleChange} />
      <TextArea
        placeholder="Description"
        value={video.description}
        onChange={onDescriptionChange}
      />
      <Select
        value={video.private}
        onChange={onPrivacyChange}
        style={{ width: "100%", marginTop: "8px" }}
      >
        {PrivateOption.map((option) => (
          <Select.Option key={option.value} value={option.value}>
            {option.label}
          </Select.Option>
        ))}
      </Select>
      <Select
        value={video.category}
        onChange={onCategoryChange}
        style={{ width: "100%", marginTop: "8px" }}
      >
        {CategoryOptions.map((option) => (
          <Select.Option key={option.value} value={option.value}>
            {option.label}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};

export default VideoInfoInput;
