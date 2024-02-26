"use client";

import { useEffect, useState } from "react";
import style from "../../styles/reserve/Reserve.module.css";
import { reserve } from "@/app/data/reserve";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft, faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import ReserveContact from "./ReserveContact";
import ReservePlace from "./ReservePlace";
import ReserveDate from "./ReserveDate";
import ReserveRecap from "./ReserveRecap";
import dayjs, { Dayjs } from "dayjs";

export default function Reserve() {
  const [page, setPage] = useState(0);

  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [text, setText] = useState("");

  const [variant, setVariant] = useState("Online");
  const [place, setPlace] = useState("");

  const [date, setDate] = useState<Dayjs | null>(null);
  const [time, setTime] = useState("");

  const items = [
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
    <ReservePlace key={"reservationPlace"} variant={variant} setVariant={setVariant} place={place} setPlace={setPlace} />,
    <ReserveDate key={"reservationDate"} date={date} setDate={setDate} time={time} setTime={setTime} />,
    <ReserveRecap
      key={"reservationRecap"}
      fName={fName}
      lName={lName}
      email={email}
      tel={tel}
      text={text}
      variant={variant}
      place={place}
      date={date?.date() ? date : dayjs()}
      time={time ? dayjs(time, "HH:mm") : dayjs()}
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
      <div style={{ minHeight: "360px" }}>{items[page]}</div>
      <div className={style.btns}>
        <button className={style.btn} disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
          <FontAwesomeIcon icon={faArrowCircleLeft} size="3x" color={`var(--${page === 0 ? "black" : "dark"})`} />
        </button>
        <button className={style.btn} disabled={page === 3} onClick={() => setPage((p) => p + 1)}>
          <FontAwesomeIcon icon={faArrowCircleRight} size="3x" color={`var(--${page === 3 ? "black" : "dark"})`} />
        </button>
      </div>
    </div>
  );
}
