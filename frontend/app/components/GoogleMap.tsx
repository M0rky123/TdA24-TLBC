import { useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import style from "../styles/GoogleMap.module.css";

export default function Places({ place, setPlace }: { place: string; setPlace: (place: string) => void }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBPJorFYXUAEk46-ZRrMlZIREjAR-UVi_4",
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map place={place} setPlace={setPlace} />;
}

function Map({ place, setPlace }: { place: string; setPlace: (place: string) => void }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="places-container">
        <PlacesAutocomplete setSelected={setSelected} place={place} setPlace={setPlace} />
      </div>
    </>
  );
}

const PlacesAutocomplete = ({ setSelected, place, setPlace }: { setSelected: any; place: string; setPlace: (place: string) => void }) => {
  const {
    ready,
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
    setPlace(address);
  };

  return (
    <>
      <input
        value={place}
        onChange={(e: { target: { value: string } }) => {
          setValue(e.target.value);
          setPlace(e.target.value);
        }}
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
