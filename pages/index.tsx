import Script from "next/script";
import Header from "@/components/Header";
import List from "@/components/List";
import Map from "@/components/Map";
import { Box, Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Coordinates, Bounds } from "@/types/store";
import { getPlacesData } from "./api";
import { Ratings } from "@/types/rating";
import { useMediaQuery } from "@mui/material";

export default function Home() {
  const [places, setPlaces] = useState<Ratings[]>([]);
  const [filteredPlaces, setFilteredPlaces] = useState<Ratings[]>([]);
  const [coordinates, setCoordinates] = useState({} as Coordinates);
  const [bounds, setBounds] = useState({} as Bounds);
  const [type, setType] = useState("restaurants");
  const [ratings, setRatings] = useState("0");
  const [isLoading, setIsLoading] = useState(false);
  const [apiLoaded, setApiLoaded] = useState(false);

  const isMobile = useMediaQuery("(max-width: 700px)");

  useEffect(() => {
    // get the user's current location on initial login
    if (typeof window !== undefined) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          if (!isNaN(latitude) && !isNaN(longitude)) {
            setCoordinates({ lat: latitude, lng: longitude });
          }
        }
      );
    }
  }, []);
  console.log("coordinates", coordinates);

  useEffect(() => {
    if (apiLoaded) {
      const filteredPlaces = places
        ? places.filter((place) => place.rating >= ratings)
        : [];
      setFilteredPlaces(filteredPlaces);
      console.log("filteredPlaces", filteredPlaces);
      console.log("ratings", ratings);
    }
  }, [apiLoaded, places, ratings, type]);

  useEffect(() => {
    setIsLoading(true);
    if (apiLoaded) {
      getPlacesData(type, bounds?.sw, bounds?.ne).then((data) => {
        console.log("data", data);
        setPlaces(data);
        setIsLoading(false);
      });
    }
  }, [apiLoaded, type, coordinates, bounds]);

  useEffect(() => {
    const hasShownAlert = localStorage.getItem("hasShownAlert");
    if (isMobile && !hasShownAlert) {
      alert(
        "This app is not optimized for mobile devices. Please use a desktop computer for the best experience."
      );
      localStorage.setItem("hasShownAlert", JSON.stringify(true));
    } else {
      localStorage.removeItem("hasShownAlert");
    }
  }, [isMobile]);

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      width={"100vw"}
      height={"100vh"}
      position={"relative"}
    >
      <Script
        id="google-map-script"
        strategy="lazyOnload"
        type="text/javascript"
        onLoad={() => setApiLoaded(true)}
        src={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=Function.prototype`}
      />

      {apiLoaded ? (
        <>
          {!isMobile && (
            <Header
              type={type}
              setType={setType}
              setRatings={setRatings}
              setCoordinates={setCoordinates}
            />
          )}

          {!isMobile && (
            <List
              places={filteredPlaces.length ? filteredPlaces : places}
              isLoading={isLoading}
            />
          )}

          <Map
            coordinates={coordinates}
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            places={filteredPlaces.length ? filteredPlaces : places}
          />
        </>
      ) : (
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "1.8rem",
          }}
        >
          Loading...
        </Box>
      )}
    </Flex>
  );
}
