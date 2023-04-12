import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from "@react-google-maps/api";
import Place from "./Place";
import Distance from "./Distance";

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

export default function CommuteMap() {
  const mapRef = useRef<GoogleMap>();
  const [currentLocation, setCurrentLocation] = useState<LatLngLiteral>();
  const [office, setOffice] = useState<LatLngLiteral>();
  const [directions, setDirections] = useState<DirectionsResult>();
  console.log("office", office);
  // current location
  useEffect(() => {
    if (typeof window !== undefined) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          if (!isNaN(latitude) && !isNaN(longitude)) {
            setCurrentLocation({ lat: latitude, lng: longitude });
          }
        }
      );
    }
  }, []);

  const center = useMemo(() => currentLocation, [currentLocation]);
  const options = useMemo<MapOptions>(
    () => ({
      mapId: "772b09c344046b91",
    }),
    []
  );

  const onLoad = useCallback((map: any) => (mapRef.current = map), []);
  const houses = useMemo(() => {
    return generateHouses(office!);
  }, [office]);

  const fetchDirections = (house: LatLngLiteral) => {
    if (!office) return;

    const service = new google.maps.DirectionsService();
    console.log("service", service);
    service.route(
      {
        origin: house,
        destination: office,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        console.log({ result, status });
        if (status === "OK" && result) {
          setDirections(result);
        }
      }
    );
  };

  console.log("directions", directions);

  return (
    <div className="container">
      <div className="controls">
        <h1>Commute?</h1>
        <Place
          setOffice={(position) => {
            setOffice(position);
            mapRef.current?.panTo(position);
          }}
        />
        {!office && (
          <p style={{ color: "#fff" }}>
            Enter an office address to get started
          </p>
        )}
        {directions && <Distance leg={directions.routes[0].legs[0]} />}
      </div>
      <div className="map">
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}
        >
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                polylineOptions: {
                  strokeColor: "#1976D2",
                  zIndex: 50,
                  strokeWeight: 5,
                },
              }}
            />
          )}
          {office && (
            <>
              <Marker
                position={office}
                icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
              />
              <MarkerClusterer>
                {(clusterer) => (
                  <div>
                    {houses.map((house, i) => (
                      <Marker
                        key={i}
                        position={house}
                        clusterer={clusterer}
                        onClick={() => {
                          fetchDirections(house);
                        }}
                      />
                    ))}
                  </div>
                )}
              </MarkerClusterer>
              <Circle center={office} radius={10000} options={closeOptions} />
              <Circle center={office} radius={25000} options={middleOptions} />
              <Circle center={office} radius={35000} options={farOptions} />
            </>
          )}
        </GoogleMap>
      </div>
    </div>
  );
}

const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};
const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: "#8BC34A",
  fillColor: "#8BC34A",
};
const middleOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: "#FBC02D",
  fillColor: "#FBC02D",
};
const farOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: "#FF5252",
  fillColor: "#FF5252",
};

const generateHouses = (position: LatLngLiteral) => {
  const _houses: Array<LatLngLiteral> = [];
  for (let i = 0; i < 100; i++) {
    const direction = Math.random() < 0.5 ? -2 : 2;
    _houses.push({
      lat: position?.lat + Math.random() / direction,
      lng: position?.lng + Math.random() / direction,
    });
  }
  return _houses;
};
