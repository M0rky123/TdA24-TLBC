import style from "../../styles/reserve/ReservePlace.module.css";
import GoogleMap from "../GoogleMap";

export default function ReservePlace({
  variant,
  setVariant,
  place,
  setPlace,
}: {
  variant: string;
  setVariant: (place: string) => void;
  place: string;
  setPlace: (place: string) => void;
}) {
  return (
    <>
      <ul className={style.list}>
        <li onClick={() => setVariant("online")} className={`${style.item} ${variant === "online" && style.activeItem}`} style={{ borderRadius: "0.5rem" }}>
          Online
        </li>
        <li onClick={() => setVariant("offline")} className={`${style.item} ${variant === "offline" && style.activeItem}`} style={{ borderRadius: "0.5rem" }}>
          Offline
        </li>
      </ul>
      {variant === "online" ? <p>Před začátkem lekce Vám lektor zašle odkaz na platformu Google Meet.</p> : <GoogleMap place={place} setPlace={setPlace} />}
    </>
  );
}
