import React, { useEffect, useRef } from "react";
import Script from "next/script";
import { GoolgeMap } from "@/types/map";
import { INITIAL_CENTER, INITIAL_ZOOM } from "@/hooks/useMap";
import { Coordinates, CurrentLocation } from "@/types/store";

declare global {
  interface Window {
    initializeMap: () => void;
  }
}

type Props = {
  mapId?: string;
  initialCenter?: Coordinates;
  initialZoom?: number;
  onLoaded?: (map: GoolgeMap) => void;
  currentLocation?: { lat: number; lng: number };
};

const Map = ({
  mapId = "map",
  initialCenter = INITIAL_CENTER,
  initialZoom = INITIAL_ZOOM,
  onLoaded,
  currentLocation,
}: Props) => {
  const mapRef = useRef<GoolgeMap | null>(null);

  const initializeMap = () => {
    const mapOptions = {
      center: new window.google.maps.LatLng(
        currentLocation.lat,
        currentLocation.lng
      ),
      default: new window.google.maps.LatLng(...initialCenter),
      zoom: initialZoom,
      minZoom: 9,
      scaleControl: false,
      mapDataControl: false,
      logoControlOptions: {
        position: google.maps.ControlPosition.LEFT_BOTTOM,
      },
    };

    let map: google.maps.Map;

    map = new window.google.maps.Map(
      document.getElementById(mapId) as HTMLElement,
      mapOptions
    );
    mapRef.current = map;

    window.initializeMap = initializeMap;

    if (onLoaded) {
      onLoaded(map);
    }
  };

  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
        onReady={initializeMap}
      />
      <div id={mapId} style={{ width: "100%", height: "100%" }} />
    </>
  );
};

export default Map;
