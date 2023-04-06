/* eslint-disable @next/next/no-sync-scripts */
import Head from "next/head";
import Image from "next/image";
import Script from "next/script";
import Header from "@/components/Header";
import List from "@/components/List";
import Map from "@/components/Map";
import PlaceDetail from "@/components/PlaceDetail";
import { Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Coordinates, Bounds } from "@/types/store";
import { getPlacesData } from "./api";
import { Rating } from "@/types/rating";

export default function Home() {
  const [places, setPlaces] = useState<Rating[]>([]);
  const [filteredPlaces, setFilteredPlaces] = useState<Rating[]>([]);
  const [coordinates, setCoordinates] = useState({} as Coordinates);
  const [bounds, setBounds] = useState({} as Bounds);
  const [type, setType] = useState("restaurants");
  const [ratings, setRatings] = useState("0");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // get the user's current location on initial login
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        if (!isNaN(latitude) && !isNaN(longitude)) {
          setCoordinates({ lat: latitude, lng: longitude });
        }
      }
    );
  }, []);
  console.log("coordinates", coordinates);

  useEffect(() => {
    const filteredPlaces = places
      ? places.filter((place) => place.rating >= ratings)
      : [];
    setFilteredPlaces(filteredPlaces);
    console.log("filteredPlaces", filteredPlaces);
    console.log("ratings", ratings);
  }, [places, ratings, type]);

  useEffect(() => {
    setIsLoading(true);
    getPlacesData(type, bounds?.sw, bounds?.ne).then((data) => {
      console.log("data", data);
      setPlaces(data);
      setIsLoading(false);
    });
  }, [type, coordinates, bounds]);

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      width={"100vw"}
      height={"100vh"}
      position={"relative"}
    >
      <Head>
        <script
          src={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
        />
      </Head>
      {/* <Script
        strategy="lazyOnload"
        src={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
      /> */}

      <Header
        type={type}
        setType={setType}
        setRatings={setRatings}
        setCoordinates={setCoordinates}
      />

      <List
        places={filteredPlaces.length ? filteredPlaces : places}
        isLoading={isLoading}
      />
      <Map
        coordinates={coordinates}
        setCoordinates={setCoordinates}
        setBounds={setBounds}
        places={filteredPlaces.length ? filteredPlaces : places}
      />

      {/* <Script
        src={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
      /> */}
    </Flex>
  );
}
