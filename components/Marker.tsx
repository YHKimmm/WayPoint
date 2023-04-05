import { IoLocation } from "react-icons/io5";
import { Box } from "@chakra-ui/react";
import React from "react";

interface MarkerProps {
  lat?: number;
  lng?: number;
  position?: string;
  cursor?: string;
}

const Marker = ({ lat, lng, position, cursor }: MarkerProps) => {
  return (
    <Box
      data-lat={lat}
      data-lng={lng}
      data-position={position}
      data-cursor={cursor}
    >
      <IoLocation color={"red"} size={30} />
    </Box>
  );
};

export default Marker;
