import style from "../../styles/reserve/ReservePlace.module.css";
import { useState } from "react";
import GoogleMap from "../GoogleMap";

export default function ReservePlace() {
  const [variant, setVariant] = useState("online");

  return (
    <>
      <ul className={style.list}>
        <li
          onClick={() => setVariant("online")}
          className={`${style.item} ${variant === "online" && style.activeItem}`}
          style={{ borderRadius: "0 0.5rem 0.5rem 0" }}
        >
          Online
        </li>
        <li
          onClick={() => setVariant("offline")}
          className={`${style.item} ${variant === "offline" && style.activeItem}`}
          style={{ borderRadius: "0.5rem 0 0 0.5rem" }}
        >
          Offline
        </li>
      </ul>
      {variant === "online" ? <p>Před začátkem lekce Vám lektor zašle odkaz na platformu Google Meet.</p> : <GoogleMap />}
    </>
  );
}
