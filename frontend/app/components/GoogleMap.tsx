import { useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import style from "../styles/GoogleMap.module.css";

export default function Places() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBPJorFYXUAEk46-ZRrMlZIREjAR-UVi_4",
    libraries: ["places"],
    region: "cz",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="places-container">
        <PlacesAutocomplete setSelected={setSelected} />
      </div>
    </>
  );
}

const PlacesAutocomplete = ({ setSelected }: { setSelected: any }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleClick = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
  };

  return (
    <>
      <input
        value={value}
        onChange={(e: { target: { value: string } }) => setValue(e.target.value)}
        disabled={!ready}
        className={style.input}
        placeholder="Zadejte adresu"
      />
      <ul className={style.list}>
        {status === "OK" &&
          data.map(({ place_id, description }) => (
            <li className={style.item} key={place_id} onClick={() => handleClick(description)}>
              {description}
            </li>
          ))}
      </ul>
    </>
  );
};
