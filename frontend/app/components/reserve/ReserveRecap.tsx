import dayjs, { Dayjs } from "dayjs";
import style from "../../styles/reserve/ReserveRecap.module.css";
import { fetchReservationPost } from "@/app/utils/fetch";

interface RecapProps {
  uuid: string;
  fName: string;
  lName: string;
  email: string;
  tel: string;
  text: string;
  online: boolean;
  place: string;
  date: Dayjs | null;
  time: Dayjs | null;
}

export default function ReserveRecap({ uuid, fName, lName, email, tel, text, online, place, date, time }: RecapProps) {
  return (
    <>
      <ul className={style.list}>
        <li>Jméno: {fName}</li>
        <li>Příjmení: {lName}</li>
        <li>E-mail: {email}</li>
        <li>Telefonní číslo: {tel}</li>
        <li>Vaše zpráva: {text}</li>
        <li>Typ: {online ? "Online" : "Osobně"}</li>
        <li>Místo: {place}</li>
        <li>Datum: {date ? dayjs(date).format("DD.MM.YYYY") : ""}</li>
        <li>Čas: {time ? dayjs(time).format("HH:mm") + " - " + dayjs(time.add(1, "hour")).format("HH:mm") : ""}</li>
      </ul>
      <button
        onClick={() =>
          fetchReservationPost(uuid, fName + " " + lName, email, tel, dayjs(date).format("DD.MM.YYYY"), dayjs(time).format("HH:mm"), online, place, text)
        }
        className={style.btn}
      >
        Odeslat
      </button>
    </>
  );
}
