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
        <li onClick={() => setVariant("Online")} className={`${style.item} ${variant === "Online" && style.activeItem}`} style={{ borderRadius: "0.5rem" }}>
          Online
        </li>
        <li onClick={() => setVariant("Osobně")} className={`${style.item} ${variant === "Osobně" && style.activeItem}`} style={{ borderRadius: "0.5rem" }}>
          Osobně
        </li>
      </ul>
      {variant === "Online" ? <p>Před začátkem lekce Vám lektor zašle odkaz na platformu Google Meet.</p> : <GoogleMap place={place} setPlace={setPlace} />}
    </>
  );
}
