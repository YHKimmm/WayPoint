import { Coordinates, Bounds } from "@/types/store";
import { useEffect, useRef } from "react";
import GoogleMapReact from "google-map-react";
import { GoogleMapType } from "@/types/map";

interface MapProps {
  coordinates: Coordinates;
  setCoordinates: (coordinates: Coordinates) => void;
  setBounds: (bounds: Bounds) => void;
}

export default function Map({
  coordinates,
  setCoordinates,
  setBounds,
}: MapProps) {
  const mapRef = useRef(null);

  const center = { lat: coordinates.lat, lng: coordinates.lng };

  return (
    <GoogleMapReact
      bootstrapURLKeys={{
        key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
      }}
      defaultZoom={10}
      zoom={10}
      center={center}
      options={{ disableDefaultUI: true, zoomControl: true }}
      ref={mapRef}
      margin={[50, 50, 50, 50]}
      onChange={(e) => {
        console.log("e", e);
        setCoordinates({ lat: e.center.lat, lng: e.center.lng });
        setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
      }}
    ></GoogleMapReact>
  );
}
