import React from "react";
import { Flex, SkeletonText, SkeletonCircle, Box } from "@chakra-ui/react";
import PlaceDetail from "./PlaceDetail";

interface ListProps {
  places: any[];
  isLoading: boolean;
}

const List = ({ places, isLoading }: ListProps) => {
  return (
    <Box>
      {isLoading ? (
        <Flex
          direction={"column"}
          bg={"whiteAlpha.900"}
          width={"37vw"}
          height="100vh"
          position={"absolute"}
          left={0}
          top={0}
          zIndex={1}
          overflow="hidden"
          px={2}
        >
          <Box padding="6" boxShadow="lg" bg="white" mt={20}>
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" />
          </Box>
          <Box padding="6" boxShadow="lg" bg="white" mt={3}>
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" />
          </Box>
          <Box padding="6" boxShadow="lg" bg="white" mt={3}>
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" />
          </Box>
          <Box padding="6" boxShadow="lg" bg="white" mt={3}>
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" />
          </Box>
          <Box padding="6" boxShadow="lg" bg="white" mt={3}>
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" />
          </Box>
        </Flex>
      ) : (
        <Flex
          direction={"column"}
          bg={"whiteAlpha.900"}
          width={"37vw"}
          height="100vh"
          position={"absolute"}
          left={0}
          top={0}
          zIndex={1}
          overflow="hidden"
          px={2}
        >
          <Flex flex={1} overflowY={"scroll"} mt={20} direction={"column"}>
            {places &&
              places.map((place, i) => <PlaceDetail place={place} key={i} />)}
          </Flex>
        </Flex>
      )}
    </Box>
  );
};

export default List;
