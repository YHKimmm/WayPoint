import React, { useState } from "react";
import {
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Box,
} from "@chakra-ui/react";
import { Autocomplete } from "@react-google-maps/api";
import {
  BiChevronDown,
  BiMapAlt,
  BiRestaurant,
  BiSearch,
  BiStar,
  BiMapPin,
} from "react-icons/bi";
import { Rating, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { Coordinates } from "@/types/store";

const theme = createTheme();

interface HeaderProps {
  type: string;
  setType: (type: string) => void;
  setRatings: (ratings: string) => void;
  setCoordinates: (cordinates: Coordinates) => void;
}
const Header = ({ type, setType, setRatings, setCoordinates }: HeaderProps) => {
  const [autocomplete, setAutocomplete] = useState<any>(null);
  const [searchInput, setSearchInput] = useState<string>("");

  console.log("autocomplete", autocomplete);
  const onLoad = (autoC: any) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const lat = autocomplete?.getPlace()?.geometry?.location?.lat();
      const lng = autocomplete?.getPlace()?.geometry?.location?.lng();
      console.log(lat, lng);
      setCoordinates({ lat, lng });
    }
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        if (!isNaN(latitude) && !isNaN(longitude)) {
          setCoordinates({ lat: latitude, lng: longitude });
        }
      }
    );
  };

  console.log("type", type);
  return (
    <header>
      <Flex>
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <InputGroup flex={1} shadow="lg">
            <InputRightElement pointerEvents={"none"}>
              <span>
                <BiSearch color="gray" fontSize={20} />
              </span>
            </InputRightElement>
            <Input
              type={"text"}
              placeholder="Search Google Map..."
              variant={"filled"}
              fontSize={{ base: "small", md: "medium" }}
              bg={"white"}
              color={"gray.700"}
              _hover={{ bg: "whiteAlpha.800" }}
              _focus={{ bg: "whiteAlpha.800" }}
              _placeholder={{ color: "gray.700" }}
            />
          </InputGroup>
        </Autocomplete>
        <Flex alignItems={"center"} justifyContent={"center"}>
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            px={4}
            py={2}
            bg={"white"}
            rounded={"full"}
            ml={2}
            shadow="lg"
            cursor={"pointer"}
            _hover={{ bg: "gray.100" }}
            transition={"ease-in-out"}
            transitionDuration={"0.3s"}
          >
            <Menu>
              <BiStar fontSize={"20"} style={{ color: "orange" }} />
              <MenuButton
                fontSize={{ base: "small", md: "large" }}
                mx={2}
                transition="all 0.2s"
                borderRadius={"md"}
              >
                Choose ratings
              </MenuButton>

              <Box>
                <MenuList>
                  <MenuItem
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent="space-around"
                    onClick={() => setRatings("")}
                  >
                    <Text
                      fontSize={{ base: "small", md: "large" }}
                      fontWeight={500}
                      color={"gray.700"}
                    >
                      All Rating
                    </Text>
                  </MenuItem>
                  <ThemeProvider theme={theme}>
                    <MenuItem
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent="space-around"
                      onClick={() => setRatings("2")}
                    >
                      <Text
                        fontSize={{ base: "small", md: "large" }}
                        fontWeight={500}
                        color={"orange.500"}
                      >
                        2.0
                      </Text>

                      <Rating size="small" value={2} readOnly />
                    </MenuItem>

                    <MenuItem
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent="space-around"
                      onClick={() => setRatings("3")}
                    >
                      <Text
                        fontSize={{ base: "small", md: "large" }}
                        fontWeight={500}
                        color={"orange.500"}
                      >
                        3.0
                      </Text>

                      <Rating size="small" value={3} readOnly />
                    </MenuItem>

                    <MenuItem
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent="space-around"
                      onClick={() => setRatings("4")}
                    >
                      <Text
                        fontSize={{ base: "small", md: "large" }}
                        fontWeight={500}
                        color={"orange.500"}
                      >
                        4.0
                      </Text>

                      <Rating size="small" value={4} readOnly />
                    </MenuItem>

                    <MenuItem
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent="space-around"
                      onClick={() => setRatings("5")}
                    >
                      <Text
                        fontSize={{ base: "small", md: "large" }}
                        fontWeight={500}
                        color={"orange.500"}
                      >
                        4.5
                      </Text>

                      <Rating size="small" value={5} readOnly />
                    </MenuItem>
                  </ThemeProvider>
                </MenuList>
              </Box>
            </Menu>
            <BiChevronDown fontSize={20} />
          </Flex>

          {/* restaurants */}
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            px={4}
            py={2}
            bg={type === "restaurants" ? "orange.500" : "white"}
            rounded={"full"}
            ml={2}
            shadow="lg"
            cursor={"pointer"}
            _hover={{
              bg: type === "restaurants" ? "orange.600" : "gray.100",
            }}
            transition={"ease-in-out"}
            transitionDuration={"0.3s"}
            onClick={() => setType("restaurants")}
          >
            <BiRestaurant
              fontSize={"25"}
              style={{ color: type === "restaurants" ? "white" : "orange" }}
            />
            <Text
              fontSize={{ base: "small", md: "large" }}
              fontWeight={"semibold"}
              mx={2}
              color={type === "restaurants" ? "white" : "black"}
            >
              Restaurants
            </Text>
          </Flex>

          {/* attractions */}
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            px={4}
            py={2}
            bg={type === "attractions" ? "orange.500" : "white"}
            rounded={"full"}
            ml={2}
            shadow="lg"
            cursor={"pointer"}
            _hover={{
              bg: type === "attractions" ? "orange.600" : "gray.100",
            }}
            transition={"ease-in-out"}
            transitionDuration={"0.3s"}
            onClick={() => setType("attractions")}
          >
            <BiMapAlt
              fontSize={"25"}
              style={{ color: type === "attractions" ? "white" : "orange" }}
            />
            <Text
              fontSize={{ base: "small", md: "large" }}
              fontWeight={"semibold"}
              mx={2}
              color={type === "attractions" ? "white" : "black"}
            >
              Attractions
            </Text>
          </Flex>
        </Flex>

        {/* My current location */}
        <Flex
          alignItems={"center"}
          justifyContent={"center"}
          px={4}
          py={2}
          bg={"white"}
          rounded={"full"}
          ml={2}
          shadow="lg"
          cursor={"pointer"}
          _hover={{ bg: "gray.100" }}
          transition={"ease-in-out"}
          transitionDuration={"0.3s"}
          onClick={getCurrentLocation}
        >
          <BiMapPin fontSize={"25"} />
          <Text
            fontSize={{ base: "small", md: "large" }}
            fontWeight={"semibold"}
            mx={2}
            color={"black"}
          >
            My Location
          </Text>
        </Flex>
      </Flex>
    </header>
  );
};

export default Header;
