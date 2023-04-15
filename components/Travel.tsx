import Header from "./Header";
import List from "./List";
import Map from "./Map";
import { Flex } from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import { Coordinates, Bounds } from "@/types/store";
import { getPlacesData } from "../pages/api/index";
import { Ratings } from "@/types/rating";
import { useMediaQuery } from "@mui/material";

export default function Travel() {
  const [places, setPlaces] = useState<Ratings[]>([]);
  const [filteredPlaces, setFilteredPlaces] = useState<Ratings[]>([]);
  const [coordinates, setCoordinates] = useState({} as Coordinates);
  const [bounds, setBounds] = useState({} as Bounds);
  const [type, setType] = useState("restaurants");
  const [ratings, setRatings] = useState("0");
  const [isLoading, setIsLoading] = useState(false);

  const isMobile = useMediaQuery("(max-width: 700px)");

  useEffect(() => {
    // get the user's current location on initial login
    if (typeof window !== undefined && typeof google !== undefined) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          if (latitude && longitude) {
            setCoordinates({ lat: latitude, lng: longitude });
            console.log("coordinates!!", coordinates);
          }
        }
      );
    }
  }, []);

  useEffect(() => {
    const filteredPlaces = places
      ? places.filter((place) => place.rating >= ratings)
      : [];
    setFilteredPlaces(filteredPlaces);
  }, [places, ratings, type]);

  useEffect(() => {
    setIsLoading(true);
    getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
      console.log("data", data);
      setPlaces(data);
      setIsLoading(false);
    });
  }, [type, coordinates, bounds]);

  useEffect(() => {
    const hasShownAlert = localStorage.getItem("hasShownAlert");
    if (isMobile && !hasShownAlert) {
      alert(
        "This page is not optimized for mobile devices. Please use a desktop computer for the best experience."
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
            places={filteredPlaces?.length ? filteredPlaces : places}
            isLoading={isLoading}
          />
        )}

        {coordinates && Object.keys(coordinates).length > 0 && (
          <Map
            places={filteredPlaces}
            coordinates={coordinates}
            setCoordinates={setCoordinates}
            setBounds={setBounds}
          />
        )}
      </>
    </Flex>
  );
}
