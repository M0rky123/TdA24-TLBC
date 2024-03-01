import { ChangeEvent, useState } from "react";
import style from "../../styles/reserve/ReservePlace.module.css";

export default function ReservePlace({
  online,
  setOnline,
  place,
  setPlace,
}: {
  online: boolean;
  setOnline: (boolean: boolean) => void;
  place: string;
  setPlace: (place: string) => void;
}) {
  const [addresses, setAddresses] = useState<string[]>([]);

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPlace(value);

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${value}`);
      const data = await response.json();
      const parsedAddresses = data.map((item: { display_name: string }) => item.display_name);
      setAddresses(parsedAddresses);
    } catch (error) {
      console.error("Error fetching addresses:", error);
      setAddresses([]);
    }
  };

  return (
    <>
      <ul className={style.nav}>
        <li onClick={() => setOnline(true)} className={`${style.navItem} ${online && style.activeItem}`} style={{ borderRadius: "0.5rem" }}>
          Online
        </li>
        <li onClick={() => setOnline(false)} className={`${style.navItem} ${online === false && style.activeItem}`} style={{ borderRadius: "0.5rem" }}>
          Osobně
        </li>
      </ul>
      {online ? (
        <p>Před začátkem lekce Vám lektor zašle odkaz na platformu Google Meet.</p>
      ) : (
        <>
          <input type="text" value={place} onChange={handleInputChange} placeholder="Zadejte adresu" className={style.input} />
          <ul className={style.list}>
            {addresses.map((address, index) => (
              <li
                key={index}
                className={style.item}
                onClick={() => {
                  setPlace(address);
                  setAddresses([]);
                }}
              >
                {address}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
