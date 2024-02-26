import dayjs, { Dayjs } from "dayjs";
import style from "../../styles/reserve/ReserveRecap.module.css";

interface RecapProps {
  fName: string;
  lName: string;
  email: string;
  tel: string;
  text: string;
  variant: string;
  place: string;
  date: Dayjs;
  time: Dayjs;
}

export default function ReserveRecap({ fName, lName, email, tel, text, variant, place, date, time }: RecapProps) {
  return (
    <ul className={style.list}>
      <li>Jméno: {fName}</li>
      <li>Příjmení: {lName}</li>
      <li>E-mail: {email}</li>
      <li>Telefonní číslo: {tel}</li>
      <li>Vaše zpráva: {text}</li>
      <li>Typ: {variant}</li>
      <li>Místo: {place}</li>
      <li>Datum: {dayjs(date).toString()}</li>
      <li>Čas: {dayjs(time).toString()}</li>
    </ul>
  );
}
