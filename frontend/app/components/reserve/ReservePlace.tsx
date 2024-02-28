import style from "../../styles/reserve/ReservePlace.module.css";
import GoogleMap from "../GoogleMap";

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
  return (
    <>
      <ul className={style.list}>
        <li onClick={() => setOnline(true)} className={`${style.item} ${online && style.activeItem}`} style={{ borderRadius: "0.5rem" }}>
          Online
        </li>
        <li onClick={() => setOnline(false)} className={`${style.item} ${online === false && style.activeItem}`} style={{ borderRadius: "0.5rem" }}>
          Osobně
        </li>
      </ul>
      {online ? <p>Před začátkem lekce Vám lektor zašle odkaz na platformu Google Meet.</p> : <GoogleMap place={place} setPlace={setPlace} />}
    </>
  );
}
