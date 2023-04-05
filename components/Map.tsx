import { Coordinates, Bounds } from "@/types/store";
import { useEffect, useRef } from "react";
import GoogleMapReact from "google-map-react";
import { Rating } from "@/types/rating";
import { Box } from "@chakra-ui/react";
import { BiX } from "react-icons/bi";
import Marker from "./Marker";

interface MapProps {
  coordinates: Coordinates;
  setCoordinates: (coordinates: Coordinates) => void;
  setBounds: (bounds: Bounds) => void;
  places: Rating[];
}

export default function Map({
  coordinates,
  setCoordinates,
  setBounds,
  places,
}: MapProps) {
  const mapRef = useRef(null);

  const center = { lat: coordinates.lat, lng: coordinates.lng };
  console.log("places", places);

  return (
    <GoogleMapReact
      bootstrapURLKeys={{
        key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
      }}
      zoom={10}
      center={center}
      options={{ disableDefaultUI: true, zoomControl: true }}
      ref={mapRef}
      onChange={(e) => {
        console.log("e", e);
        setCoordinates({ lat: e.center.lat, lng: e.center.lng });
        setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
      }}
    >
      {places !== undefined &&
        places.map((place, i) => (
          <Marker
            key={i}
            lat={Number(place.latitude) ? Number(place.latitude) : 0}
            lng={Number(place.longitude) ? Number(place.longitude) : 0}
            position="relative"
            cursor="pointer"
          />
        ))}
    </GoogleMapReact>
  );
}
