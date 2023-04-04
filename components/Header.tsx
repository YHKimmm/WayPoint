import React from "react";
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
  BiHotel,
  BiMapAlt,
  BiRestaurant,
  BiSearch,
  BiStar,
} from "react-icons/bi";
import { Rating, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const theme = createTheme();

interface HeaderProps {
  setType: (type: string) => void;
  setRatings: (ratings: string) => void;
}
const Header = ({ setType, setRatings }: HeaderProps) => {
  return (
    <header>
      <Flex>
        <InputGroup flex={1} shadow="lg">
          <InputRightElement
            pointerEvents={"none"}
            // eslint-disable-next-line react/no-children-prop
            children={<BiSearch color="gray" fontSize={20} />}
          />
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
                        5.0
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
            bg={"white"}
            rounded={"full"}
            ml={2}
            shadow="lg"
            cursor={"pointer"}
            _hover={{ bg: "gray.100" }}
            transition={"ease-in-out"}
            transitionDuration={"0.3s"}
            onClick={() => setType("restaurants")}
          >
            <BiRestaurant fontSize={"25"} style={{ color: "orange" }} />
            <Text
              fontSize={{ base: "small", md: "large" }}
              fontWeight={"semibold"}
              mx={2}
            >
              Restaurants
            </Text>
          </Flex>

          {/* hotels */}
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
            onClick={() => setType("hotels")}
          >
            <BiHotel fontSize={"25"} style={{ color: "orange" }} />
            <Text
              fontSize={{ base: "small", md: "large" }}
              fontWeight={"semibold"}
              mx={2}
            >
              Hotels
            </Text>
          </Flex>

          {/* Attractions */}
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
            onClick={() => setType("attractions")}
          >
            <BiMapAlt fontSize={"25"} style={{ color: "orange" }} />
            <Text
              fontSize={{ base: "small", md: "large" }}
              fontWeight={"semibold"}
              mx={2}
            >
              Attractions
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </header>
  );
};

export default Header;
