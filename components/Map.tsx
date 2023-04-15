import { Coordinates, Bounds } from "@/types/store";
import { useState } from "react";
import GoogleMapReact from "google-map-react";
import { Ratings } from "@/types/rating";
import { Rating, ThemeProvider } from "@mui/material";
import { Box, Image, Text, Flex } from "@chakra-ui/react";
import { BiX } from "react-icons/bi";
import Marker from "./Marker";
import { createTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

const theme = createTheme();

type googleMapsApiKey = string;
type LatLngLiteral = google.maps.LatLngLiteral;

interface MapProps {
  coordinates: Coordinates;
  setCoordinates: (coordinates: Coordinates) => void;
  setBounds: (bounds: Bounds) => void;
  places: Ratings[];
}

export default function Map({
  coordinates,
  setCoordinates,
  setBounds,
  places,
}: MapProps) {
  const isMobile = useMediaQuery("(max-width: 700px)");

  const [isCardOpen, setIsCardOpen] = useState(false);
  const [cardData, setCardData] = useState({} as any);
  const [markerPosition, setMarkerPosition] = useState({ lat: 0, lng: 0 });

  const center = { lat: coordinates?.lat, lng: coordinates?.lng };

  return (
    <GoogleMapReact
      bootstrapURLKeys={{
        key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as googleMapsApiKey,
      }}
      center={center}
      zoom={15}
      onChange={(e) => {
        setCoordinates({ lat: e?.center?.lat, lng: e?.center?.lng });
        setBounds({ ne: e?.marginBounds?.ne, sw: e?.marginBounds?.sw });
      }}
      onChildClick={(child) => {
        console.log("clicked marker index:", child);
        setCardData(places[child]);
        setIsCardOpen(true);
      }}
    >
      {places !== undefined &&
        places.map((place, i) => (
          <Marker
            key={i}
            lat={Number(place?.latitude) ? Number(place?.latitude) : 0}
            lng={Number(place?.longitude) ? Number(place?.longitude) : 0}
            cursor="pointer"
            onClick={() =>
              setMarkerPosition({
                lat: Number(place.latitude),
                lng: Number(place.longitude),
              })
            }
          />
        ))}

      {isCardOpen && (
        <Box
          width={isMobile ? "150px" : "250px"}
          height={"fit-content"}
          position={"absolute"}
          top={-50}
          left={isMobile ? "-20" : "20"}
          shadow={"lg"}
          rounded={"lg"}
          padding={4}
          bg={"whiteAlpha.900"}
          cursor={"pointer"}
          onClick={() => setIsCardOpen(false)}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image
            alt="place image"
            objectFit={"cover"}
            width={"full"}
            maxHeight={"170px"}
            marginBottom={4}
            rounded="lg"
            src={
              cardData?.photo
                ? cardData?.photo?.images?.large?.url
                : "https://explorelompoc.com/wp-content/uploads/2021/06/food_placeholder.jpg"
            }
          />
          <Text
            textTransform={"capitalize"}
            color={"orange.800"}
            fontSize={isMobile ? "sm" : "xl"}
            fontWeight={"900"}
          >
            {cardData.name}
          </Text>
          <Flex
            alignItems={"center"}
            width={"full"}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <ThemeProvider theme={theme}>
              <Rating
                size={isMobile ? "small" : "medium"}
                value={Number(cardData.rating)}
                readOnly
              />
              <Text
                fontSize={isMobile ? "sm" : "md"}
                fontWeight={"500"}
                color={"gray.500"}
              >
                {cardData.num_reviews && `${cardData.num_reviews}`}
              </Text>
            </ThemeProvider>
          </Flex>
          <Box
            cursor={"pointer"}
            position={"absolute"}
            top={0}
            right={0}
            width={isMobile ? "15px" : "20px"}
            height={isMobile ? "15px" : "20px"}
            bg={"red.300"}
            rounded={"full"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            onClick={() => {
              setIsCardOpen(false);
            }}
          >
            <BiX fontSize={30} color="white" />
          </Box>
        </Box>
      )}
    </GoogleMapReact>
  );
}
