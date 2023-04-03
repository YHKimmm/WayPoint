import Head from "next/head";
import Image from "next/image";
import Header from "@/components/Header";
import List from "@/components/List";
import Map from "@/components/Map";
import PlaceDetail from "@/components/PlaceDetail";
import { Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Coordinates, CurrentLocation } from "@/types/store";

const places = [
  { name: "Best Place" },
  { name: "Second Best Place" },
  { name: "Third Best Place" },
  { name: "Fourth Best Place" },
  { name: "Fifth Best Place" },
  { name: "Sixth Best Place" },
];

export default function Home() {
  const [currentLocation, setCurrentLocation] = useState({});
  const [type, setType] = useState("restaurants");
  const [ratings, setRatings] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // get the user's current location on initial login
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        console.log(latitude, longitude);
        setCurrentLocation({ lat: latitude, lng: longitude });
      }
    );
  }, []);
  console.log("currentLocation", currentLocation);

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      width={"100vw"}
      height={"100vh"}
      position={"relative"}
    >
      <Header setType={setType} setRatings={setRatings} />

      <List places={places} isLoading={isLoading} />

      <Map currentLocation={currentLocation} />
    </Flex>
  );
}
