import React from "react";
import { useLoadScript } from "@react-google-maps/api";
import CommuteMap from "@/components/CommuteMap";

type googleMapsApiKey = string;

const commute = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env
      .NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as googleMapsApiKey,
    libraries: ["places"],
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return <CommuteMap />;
};

export default commute;
