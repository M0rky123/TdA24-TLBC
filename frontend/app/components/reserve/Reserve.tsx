"use client";

import { useState } from "react";
import style from "../../styles/reserve/Reserve.module.css";
import ReserveContact from "./ReserveContact";
import ReservePlace from "./ReservePlace";
import ReserveDate from "./ReserveDate";
import ReserveRecap from "./ReserveRecap";
import { Dayjs } from "dayjs";

export default function Reserve({ uuid }: { uuid: string }) {
  const reserve = ["Datum a Čas", "Místo setkání", "Kontaktní údaje", "Rekapitulace"];

  const [page, setPage] = useState(0);

  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [text, setText] = useState("");

  const [online, setOnline] = useState<boolean>(true);
  const [place, setPlace] = useState("");

  const [date, setDate] = useState<Dayjs | null>(null);
  const [time, setTime] = useState<number | undefined>();

  const items = [
    <ReserveDate key={"reservationDate"} uuid={uuid} date={date} setDate={setDate} time={time} setTime={setTime} />,
    <ReservePlace key={"reservationPlace"} online={online} setOnline={setOnline} place={place} setPlace={setPlace} />,
    <ReserveContact
      key={"reservationContact"}
      fName={fName}
      setFName={setFName}
      lName={lName}
      setLName={setLName}
      email={email}
      setEmail={setEmail}
      tel={tel}
      setTel={setTel}
      text={text}
      setText={setText}
    />,
    <ReserveRecap
      key={"reservationRecap"}
      uuid={uuid}
      fName={fName}
      lName={lName}
      email={email}
      tel={tel}
      text={text}
      online={online}
      place={place}
      date={date}
      time={time}
    />,
  ];

  return (
    <div className={style.container}>
      <ul className={style.list}>
        {reserve.map((item, index) => (
          <li key={index} onClick={() => setPage(index)} className={`${index === page ? style.activeItem : style.item}`}>
            {item}
          </li>
        ))}
      </ul>
      <div>{items[page]}</div>
    </div>
  );
}
