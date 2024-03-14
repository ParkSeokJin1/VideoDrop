import React, { useState, useLayoutEffect } from "react";

const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState("pc");

  let screenWidth = window.innerWidth;

  const updateDeviceType = () => {
    screenWidth = window.innerWidth;

    if (screenWidth <= 768) {
      setDeviceType("mobile");
    }
    if (screenWidth > 768 && screenWidth <= 1024) {
      setDeviceType("tablet");
    }

    if (screenWidth > 900) {
      setDeviceType("pc");
    }
  };

  useLayoutEffect(() => {
    updateDeviceType();
    // 화면에 resize 가 발생하면 updateDeviceType을 동작시키기
    window.addEventListener("resize", updateDeviceType);

    return () => {
      window.removeEventListener("resize", updateDeviceType);
    };
  }, [deviceType]);

  return deviceType;
};

export default useDeviceType;
