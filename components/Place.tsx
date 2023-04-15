import { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";

interface PlacesProps {
  setOffice: (position: google.maps.LatLngLiteral) => void;
}

export default function Place({ setOffice }: PlacesProps) {
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete>();

  const handlePlaceSelect = () => {
    const place = autocomplete?.getPlace();
    if (place?.geometry?.location) {
      const { lat, lng } = place.geometry.location.toJSON();
      setOffice({ lat, lng });
    }
  };

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setAutocomplete(autocomplete);
  };

  console.log("autocomplete", autocomplete);

  return (
    <Autocomplete onLoad={onLoad} onPlaceChanged={handlePlaceSelect}>
      <InputGroup>
        <Input
          placeholder="Search office address"
          borderRadius="5"
          borderColor="gray.200"
          _hover={{ borderColor: "gray.400" }}
          color={"gray.100"}
        />
        <InputRightElement pointerEvents={"none"}>
          <span>
            <BiSearch color="gray" fontSize={20} />
          </span>
        </InputRightElement>
      </InputGroup>
    </Autocomplete>
  );
}
