import { Box, colors } from '@mui/material';
import React, { useEffect, useState } from 'react';

const clockNumbers = ["I", "I", 3, "I", "I", 6, "I", "I", 9, "I", "I", 12];

const Needle = ({
  width,
  height,
  beforeWidth,
  beforeHeight,
  transform,
  bgcolor
}) => {
  return (
    <Box sx={{ position: "absolute" }}>
      <Box sx={{
        width,
        height,
        display: "flex",
        justifyContent: "center",
        transform,
        "&:before": {
          content: '""',
          position: "absolute",
          width: beforeWidth,
          height: beforeHeight,
          bgcolor,
          borderRadius: "6px"
        }
      }} />
    </Box>
  );
};

const Clock = () => {
  const [hourRotate, setHourRotate] = useState("0");
  const [minRotate, setMinRotate] = useState("0");
  const [secondRotate, setSecondRotate] = useState("0");

  useEffect(() => {
    setInterval(() => {
      let day = new Date();

      const hour = day.getHours() % 12;
      const min = day.getMinutes();
      const sec = day.getSeconds();
      const ms = day.getMilliseconds();

      const hourRotation = 30 * hour + 0.5 * min;
      const minRotation = 6 * min + 0.1 * sec;
      const secRotation = 6 * sec + 0.006 * ms;

      setHourRotate(`${hourRotation}deg`);
      setMinRotate(`${minRotation}deg`);
      setSecondRotate(`${secRotation}deg`);
    });
  }, []);


  return (
    // clock face
    <Box sx={{
      width: "350px",
      height: "350px",
      borderRadius: "50%",
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      "&:before": {
        content: '""',
        position: "absolute",
        width: "15px",
        height: "15px",
        bgcolor: colors.grey[600],
        borderRadius: "50%",
        zIndex: 100
      }
    }}>
        {/* digits */}
      {clockNumbers.map((item, index) => (
        <Box
          key={index}
          sx={{
            color: "#7F8CAA",
            position: "absolute",
            inset: "12px",
            textAlign: "center",
            fontSize: "2rem",
            transform: `rotate(calc(30deg * ${index + 1}))`
          }}
        >
          <Box sx={{
            transform: [3, 6, 9, 12].includes(item) ? `rotate(calc(-30deg * ${index + 1}))` : ""
          }}>
            {item}
          </Box>
        </Box>
      ))}

      {/* hour needle */}
      <Needle
        width="160px"
        height="160px"
        beforeWidth="8px"
        beforeHeight="80px"
        bgcolor={"#44A194"}
        transform={`rotateZ(${hourRotate})`}
      />

      {/* minute needle */}
      <Needle
        width="190px"
        height="190px"
        beforeWidth="4px"
        beforeHeight="90px"
        bgcolor={"#537D96"}
        transform={`rotateZ(${minRotate})`}
      />

      {/* second needle */}
      <Needle
        width="230px"
        height="230px"
        beforeWidth="2px"
        beforeHeight="150px"
        bgcolor={"#EC8F8D"}
        transform={`rotateZ(${secondRotate})`}
      />
    </Box>
  );
};

export default Clock;