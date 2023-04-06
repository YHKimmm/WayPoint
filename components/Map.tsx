import { Coordinates, Bounds } from "@/types/store";
import { useState, useRef } from "react";
import GoogleMapReact from "google-map-react";
import { Rating } from "@/types/rating";
import { Box, Image, Text } from "@chakra-ui/react";
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
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [cardData, setCardData] = useState({} as any);
  const mapRef = useRef(null);

  const center = { lat: coordinates.lat, lng: coordinates.lng };
  console.log("places", places);
  console.log("cardData", cardData);

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
      onChildClick={(child) => {
        console.log({ child });
        setCardData(places[child]);
        setIsCardOpen(true);
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

      {isCardOpen && (
        <Box
          width={"200px"}
          height={"150px"}
          bg={"whiteAlpha.900"}
          position={"absolute"}
          top={-12}
          left={10}
          shadow={"lg"}
          rounded={"lg"}
        >
          <Image
            alt="place image"
            objectFit={"cover"}
            width={"full"}
            rounded="lg"
            src={
              cardData?.photo
                ? cardData?.photo?.images?.large?.url
                : "https://explorelompoc.com/wp-content/uploads/2021/06/food_placeholder.jpg"
            }
          />
          <Text
            textTransform={"capitalize"}
            width={"40"}
            fontSize={"lg"}
            fontWeight={"500"}
            isTruncated
          >
            {cardData.name}
          </Text>
          <Box
            cursor={"pointer"}
            position={"absolute"}
            top={2}
            right={2}
            width={"30px"}
            height={"30px"}
            bg={"red.300"}
            rounded={"full"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            onClick={() => {
              setIsCardOpen(false);
            }}
          >
            <BiX fontSize={20} />
          </Box>
        </Box>
      )}
    </GoogleMapReact>
  );
}
