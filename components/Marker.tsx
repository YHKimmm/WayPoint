import { IoLocation } from "react-icons/io5";
import { Box } from "@chakra-ui/react";
import React from "react";

interface MarkerProps {
  lat: number;
  lng: number;
  cursor: string;
  onClick: () => void;
}

const Marker = ({ lat, lng, cursor, onClick }: MarkerProps) => {
  return (
    <Box
      data-lat={lat.toString()}
      data-lng={lng.toString()}
      data-cursor={cursor}
      onClick={() => onClick()}
    >
      <IoLocation style={{ color: "#EF4444" }} size={30} />
    </Box>
  );
};

export default Marker;
