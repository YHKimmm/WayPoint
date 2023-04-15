// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from "use-places-autocomplete";
// import { Autocomplete } from "@material-ui/lab";
// import { TextField } from "@material-ui/core";

// interface PlacesProps {
//   setOffice: (position: google.maps.LatLngLiteral) => void;
// }

// export default function Place({ setOffice }: PlacesProps) {
//   const {
//     ready,
//     value,
//     setValue,
//     suggestions: { status, data },
//     clearSuggestions,
//   } = usePlacesAutocomplete();

//   const handleSelect = async (address: string) => {
//     setValue(address, false);
//     clearSuggestions();

//     const result = await getGeocode({ address });
//     const { lat, lng } = await getLatLng(result[0]);
//     setOffice({ lat, lng });
//   };

//   return (
//     <Combobox onSelect={handleSelect}>
//       <ComboboxInput
//         value={value}
//         onChange={(e) => {
//           setValue(e.target.value);
//         }}
//         disabled={!ready}
//         placeholder="Search office address"
//         className="combobox-input"
//       />
//       <ComboboxPopover>
//         <ComboboxList>
//           {status === "OK" &&
//             data.map(({ place_id, description }) => (
//               <ComboboxOption key={place_id} value={description} />
//             ))}
//         </ComboboxList>
//       </ComboboxPopover>
//     </Combobox>
//   );
// }
