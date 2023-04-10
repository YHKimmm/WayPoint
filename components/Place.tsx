import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import useAutocomplete from "@mui/material/useAutocomplete";

interface PlacesProps {
  setOffice: (position: google.maps.LatLngLiteral) => void;
}

export default function Place({ setOffice }: PlacesProps) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  console.log({ status, data });
  return (
    <Combobox onSelect={() => {}}>
      <ComboboxInput
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        disabled={!ready}
        placeholder="Search office address"
        className="combobox-input"
      />
    </Combobox>
  );
}
